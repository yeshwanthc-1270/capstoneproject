import Activity from "../models/Activity.js";
import jwt from "jsonwebtoken";

export const trackActivity = (action, description) => {
  return async (req, res, next) => {
    // Store original response methods
    const originalJson = res.json;
    const originalSend = res.send;
    const originalStatus = res.status;

    // Override response methods to track activity after successful response
    res.json = function(data) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        logActivity(req, action, description, data);
      }
      return originalJson.call(this, data);
    };

    res.send = function(data) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        logActivity(req, action, description, data);
      }
      return originalSend.call(this, data);
    };

    next();
  };
};

const logActivity = async (req, action, description, responseData) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id) return;

    const activity = new Activity({
      userId: decoded.id,
      action,
      description,
      metadata: {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        method: req.method,
        path: req.path,
        responseStatus: responseData?.success !== false ? 'success' : 'error'
      }
    });

    await activity.save();
  } catch (error) {
    console.error('Activity logging error:', error);
  }
};