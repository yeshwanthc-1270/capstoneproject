import React, { useState, useEffect } from "react";
import {
  User,
  Activity,
  Calendar,
  Clock,
  Edit3,
  Map,
  FileText,
  Briefcase,
  LogIn,
  LogOut,
  Trash2,
  CheckCircle,
  X,
  Plus,
  Target,
  BookOpen,
  Users,
  Bell,
  TrendingUp,
  Award,
  Code,
  FolderOpen,
  Settings,
  Save,
  Star,
  AlertCircle,
  DollarSign,
  Phone,
  Mail,
  Globe,
  Linkedin,
  Github
} from "lucide-react";

const UserActivitySidebar = ({ isOpen, onClose }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [activities, setActivities] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [editingSection, setEditingSection] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    if (isOpen) {
      fetchUserData();
    }
  }, [isOpen]);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      const [profileRes, activitiesRes, statsRes] = await Promise.all([
        fetch("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch("http://localhost:5000/api/user/activities", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch("http://localhost:5000/api/user/dashboard-stats", {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setUserProfile(profileData.profile);
      }

      if (activitiesRes.ok) {
        const activitiesData = await activitiesRes.json();
        setActivities(activitiesData.activities || []);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setDashboardStats(statsData.stats);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (section, data) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const updateData = { [section]: data };
      const response = await fetch("http://localhost:5000/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.profile);
        setEditingSection(null);
        setEditForm({});
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleAddItem = async (endpoint, data) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/api/user/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        fetchUserData(); // Refresh data
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleSaveRoadmap = async (role, phases) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:5000/api/user/roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ role, phases })
      });

      if (response.ok) {
        fetchUserData(); // Refresh data
        return true;
      }
    } catch (error) {
      console.error("Error saving roadmap:", error);
    }
    return false;
  };

  const handleUpdateRoadmap = async (role, phases) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:5000/api/user/roadmap", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ role, phases })
      });

      if (response.ok) {
        fetchUserData(); // Refresh data
        return true;
      }
    } catch (error) {
      console.error("Error updating roadmap:", error);
    }
    return false;
  };

  const handleDeleteRoadmap = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!confirm("Are you sure you want to delete this roadmap?")) return;

    try {
      const response = await fetch("http://localhost:5000/api/user/roadmap", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchUserData(); // Refresh data
        return true;
      }
    } catch (error) {
      console.error("Error deleting roadmap:", error);
    }
    return false;
  };

  const getActivityIcon = (action) => {
    switch (action) {
      case 'login': return <LogIn size={16} className="text-green-500" />;
      case 'logout': return <LogOut size={16} className="text-red-500" />;
      case 'resume_upload': return <FileText size={16} className="text-blue-500" />;
      case 'resume_analyze': return <FileText size={16} className="text-purple-500" />;
      case 'job_match': return <Briefcase size={16} className="text-orange-500" />;
      case 'roadmap_generate': return <Map size={16} className="text-indigo-500" />;
      case 'roadmap_save': return <Map size={16} className="text-green-500" />;
      case 'roadmap_edit': return <Edit3 size={16} className="text-yellow-500" />;
      case 'roadmap_delete': return <Trash2 size={16} className="text-red-500" />;
      case 'profile_update': return <User size={16} className="text-blue-500" />;
      case 'job_application_add': return <Briefcase size={16} className="text-green-500" />;
      case 'skill_add': return <Code size={16} className="text-purple-500" />;
      case 'learning_add': return <BookOpen size={16} className="text-blue-500" />;
      case 'objective_add': return <Target size={16} className="text-orange-500" />;
      case 'reminder_add': return <Bell size={16} className="text-yellow-500" />;
      case 'contact_add': return <Users size={16} className="text-indigo-500" />;
      default: return <Activity size={16} className="text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return date.toLocaleDateString();
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'career', label: 'Career', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'learning', label: 'Learning', icon: BookOpen },
    { id: 'network', label: 'Network', icon: Users },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'reminders', label: 'Reminders', icon: Bell },
    { id: 'roadmaps', label: 'Roadmaps', icon: Map },
    { id: 'activities', label: 'Activities', icon: Activity }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="relative ml-auto w-96 h-full flex flex-col" style={{
        backgroundColor: 'var(--bg-primary)',
        borderLeft: `1px solid var(--border-color)`
      }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{
          borderColor: 'var(--border-color)'
        }}>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Career Dashboard
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-opacity-20 hover:bg-gray-500"
          >
            <X size={20} style={{ color: 'var(--text-secondary)' }} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto border-b" style={{ borderColor: 'var(--border-color)' }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-3 text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  activeTab === tab.id ? 'border-b-2' : ''
                }`}
                style={{
                  color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--text-secondary)',
                  borderColor: 'var(--color-primary)'
                }}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{
                borderColor: 'var(--color-primary)'
              }}></div>
            </div>
          ) : (
            <>
              {/* Overview Tab */}
              {activeTab === 'overview' && dashboardStats && (
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase size={16} style={{ color: 'var(--color-primary)' }} />
                        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                          Applications
                        </span>
                      </div>
                      <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                        {dashboardStats.totalApplications}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        {dashboardStats.activeApplications} active
                      </p>
                    </div>

                    <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar size={16} style={{ color: 'var(--color-primary)' }} />
                        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                          Interviews
                        </span>
                      </div>
                      <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                        {dashboardStats.upcomingInterviews}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        upcoming
                      </p>
                    </div>

                    <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <Target size={16} style={{ color: 'var(--color-primary)' }} />
                        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                          Objectives
                        </span>
                      </div>
                      <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                        {dashboardStats.activeObjectives}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        in progress
                      </p>
                    </div>

                    <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen size={16} style={{ color: 'var(--color-primary)' }} />
                        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                          Learning
                        </span>
                      </div>
                      <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                        {dashboardStats.enrolledCourses}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        courses
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setActiveTab('career')}
                        className="p-3 rounded-lg text-left hover:bg-opacity-50 transition-colors"
                        style={{ backgroundColor: 'var(--bg-secondary)' }}
                      >
                        <Briefcase size={16} className="mb-1" style={{ color: 'var(--color-primary)' }} />
                        <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                          Add Application
                        </div>
                      </button>

                      <button
                        onClick={() => setActiveTab('skills')}
                        className="p-3 rounded-lg text-left hover:bg-opacity-50 transition-colors"
                        style={{ backgroundColor: 'var(--bg-secondary)' }}
                      >
                        <Code size={16} className="mb-1" style={{ color: 'var(--color-primary)' }} />
                        <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                          Add Skill
                        </div>
                      </button>

                      <button
                        onClick={() => setActiveTab('learning')}
                        className="p-3 rounded-lg text-left hover:bg-opacity-50 transition-colors"
                        style={{ backgroundColor: 'var(--bg-secondary)' }}
                      >
                        <BookOpen size={16} className="mb-1" style={{ color: 'var(--color-primary)' }} />
                        <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                          Add Course
                        </div>
                      </button>

                      <button
                        onClick={() => setActiveTab('goals')}
                        className="p-3 rounded-lg text-left hover:bg-opacity-50 transition-colors"
                        style={{ backgroundColor: 'var(--bg-secondary)' }}
                      >
                        <Target size={16} className="mb-1" style={{ color: 'var(--color-primary)' }} />
                        <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                          Set Goal
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && userProfile && (
                <div className="p-6 space-y-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User size={32} className="text-white" />
                    </div>
                    {editingSection === 'basic' ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editForm.name || userProfile.name}
                          onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 border rounded-lg text-center font-semibold"
                          style={{
                            backgroundColor: 'var(--bg-secondary)',
                            borderColor: 'var(--border-color)',
                            color: 'var(--text-primary)'
                          }}
                        />
                        <input
                          type="email"
                          value={editForm.email || userProfile.email}
                          onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-3 py-2 border rounded-lg text-center text-sm"
                          style={{
                            backgroundColor: 'var(--bg-secondary)',
                            borderColor: 'var(--border-color)',
                            color: 'var(--text-secondary)'
                          }}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateProfile('name', editForm.name || userProfile.name)}
                            className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingSection(null)}
                            className="flex-1 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                          {userProfile.name}
                        </h3>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          {userProfile.email}
                        </p>
                        <button
                          onClick={() => setEditingSection('basic')}
                          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 mx-auto"
                        >
                          <Edit3 size={16} />
                          Edit Profile
                        </button>
                      </>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg" style={{
                      backgroundColor: 'var(--bg-secondary)'
                    }}>
                      <Calendar size={20} style={{ color: 'var(--color-primary)' }} />
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                          Member Since
                        </p>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                          {new Date(userProfile.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {userProfile.currentRole && (
                      <div className="flex items-center gap-3 p-3 rounded-lg" style={{
                        backgroundColor: 'var(--bg-secondary)'
                      }}>
                        <Briefcase size={20} style={{ color: 'var(--color-primary)' }} />
                        <div>
                          <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                            Current Role
                          </p>
                          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                            {userProfile.currentRole} at {userProfile.company}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Career Tab */}
              {activeTab === 'career' && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                      Job Applications
                    </h3>
                    <button
                      onClick={() => {
                        const company = prompt('Company name:');
                        const position = prompt('Position:');
                        if (company && position) {
                          handleAddItem('job-application', { company, position });
                        }
                      }}
                      className="p-2 rounded-lg hover:bg-opacity-50 transition-colors"
                      style={{ backgroundColor: 'var(--bg-secondary)' }}
                    >
                      <Plus size={16} style={{ color: 'var(--color-primary)' }} />
                    </button>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {userProfile?.jobTracking?.applications?.slice(-5).map((app, index) => (
                      <div key={index} className="p-3 rounded-lg" style={{
                        backgroundColor: 'var(--bg-secondary)'
                      }}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                            {app.position}
                          </h4>
                          <span className={`px-2 py-1 rounded text-xs ${
                            app.status === 'applied' ? 'bg-blue-100 text-blue-700' :
                            app.status === 'interview' ? 'bg-yellow-100 text-yellow-700' :
                            app.status === 'offer' ? 'bg-green-100 text-green-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          {app.company}
                        </p>
                        <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                          Applied: {new Date(app.appliedDate).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Tab */}
              {activeTab === 'skills' && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                      Skills & Expertise
                    </h3>
                    <button
                      onClick={() => {
                        const name = prompt('Skill name:');
                        const level = prompt('Level (beginner/intermediate/advanced/expert):');
                        if (name && level) {
                          handleAddItem('skill', { name, level, yearsOfExperience: 0 });
                        }
                      }}
                      className="p-2 rounded-lg hover:bg-opacity-50 transition-colors"
                      style={{ backgroundColor: 'var(--bg-secondary)' }}
                    >
                      <Plus size={16} style={{ color: 'var(--color-primary)' }} />
                    </button>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {userProfile?.skills?.map((skill, index) => (
                      <div key={index} className="p-3 rounded-lg" style={{
                        backgroundColor: 'var(--bg-secondary)'
                      }}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                            {skill.name}
                          </h4>
                          <span className={`px-2 py-1 rounded text-xs ${
                            skill.level === 'expert' ? 'bg-purple-100 text-purple-700' :
                            skill.level === 'advanced' ? 'bg-blue-100 text-blue-700' :
                            skill.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {skill.level}
                          </span>
                        </div>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                          {skill.yearsOfExperience} years experience
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Learning Tab */}
              {activeTab === 'learning' && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                      Learning & Development
                    </h3>
                    <button
                      onClick={() => {
                        const title = prompt('Course/Book title:');
                        const platform = prompt('Platform/Author:');
                        const type = prompt('Type (course/book):');
                        if (title && platform && type) {
                          handleAddItem('learning', {
                            type,
                            item: type === 'course' ? {
                              title, platform, progress: 0
                            } : {
                              title, author: platform, status: 'want-to-read'
                            }
                          });
                        }
                      }}
                      className="p-2 rounded-lg hover:bg-opacity-50 transition-colors"
                      style={{ backgroundColor: 'var(--bg-secondary)' }}
                    >
                      <Plus size={16} style={{ color: 'var(--color-primary)' }} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                        Enrolled Courses
                      </h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {userProfile?.learning?.enrolledCourses?.slice(-3).map((course, index) => (
                          <div key={index} className="p-2 rounded text-sm" style={{
                            backgroundColor: 'var(--bg-secondary)'
                          }}>
                            <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                              {course.title}
                            </p>
                            <p style={{ color: 'var(--text-secondary)' }}>
                              {course.platform} • {course.progress}% complete
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                        Reading List
                      </h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {userProfile?.learning?.readingList?.slice(-3).map((book, index) => (
                          <div key={index} className="p-2 rounded text-sm" style={{
                            backgroundColor: 'var(--bg-secondary)'
                          }}>
                            <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                              {book.title}
                            </p>
                            <p style={{ color: 'var(--text-secondary)' }}>
                              by {book.author} • {book.status}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Network Tab */}
              {activeTab === 'network' && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                      Professional Network
                    </h3>
                    <button
                      onClick={() => {
                        const name = prompt('Contact name:');
                        const company = prompt('Company:');
                        if (name && company) {
                          handleAddItem('contact', { name, company, relationship: 'colleague' });
                        }
                      }}
                      className="p-2 rounded-lg hover:bg-opacity-50 transition-colors"
                      style={{ backgroundColor: 'var(--bg-secondary)' }}
                    >
                      <Plus size={16} style={{ color: 'var(--color-primary)' }} />
                    </button>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {userProfile?.network?.contacts?.slice(-5).map((contact, index) => (
                      <div key={index} className="p-3 rounded-lg" style={{
                        backgroundColor: 'var(--bg-secondary)'
                      }}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                            {contact.name}
                          </h4>
                          <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700">
                            {contact.relationship}
                          </span>
                        </div>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          {contact.position} at {contact.company}
                        </p>
                        {contact.lastContact && (
                          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                            Last contact: {new Date(contact.lastContact).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Goals Tab */}
              {activeTab === 'goals' && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                      Career Objectives
                    </h3>
                    <button
                      onClick={() => {
                        const title = prompt('Objective title:');
                        const type = prompt('Type (monthly/quarterly/yearly):');
                        if (title && type) {
                          handleAddItem('objective', {
                            type,
                            objective: { title, description: '', status: 'not-started' }
                          });
                        }
                      }}
                      className="p-2 rounded-lg hover:bg-opacity-50 transition-colors"
                      style={{ backgroundColor: 'var(--bg-secondary)' }}
                    >
                      <Plus size={16} style={{ color: 'var(--color-primary)' }} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {['monthly', 'quarterly', 'yearly'].map((period) => (
                      <div key={period}>
                        <h4 className="font-medium mb-3 capitalize" style={{ color: 'var(--text-primary)' }}>
                          {period} Goals
                        </h4>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {userProfile?.objectives?.[period]?.slice(-2).map((objective, index) => (
                            <div key={index} className="p-2 rounded text-sm" style={{
                              backgroundColor: 'var(--bg-secondary)'
                            }}>
                              <div className="flex items-center justify-between">
                                <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                                  {objective.title}
                                </p>
                                <span className={`px-2 py-1 rounded text-xs ${
                                  objective.status === 'completed' ? 'bg-green-100 text-green-700' :
                                  objective.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  {objective.status}
                                </span>
                              </div>
                              {objective.progress > 0 && (
                                <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                                  <div
                                    className="bg-blue-600 h-1 rounded-full"
                                    style={{ width: `${objective.progress}%` }}
                                  ></div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reminders Tab */}
              {activeTab === 'reminders' && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                      Reminders & Deadlines
                    </h3>
                    <button
                      onClick={() => {
                        const title = prompt('Reminder title:');
                        const dueDate = prompt('Due date (YYYY-MM-DD):');
                        if (title && dueDate) {
                          handleAddItem('reminder', {
                            title,
                            dueDate: new Date(dueDate),
                            type: 'follow-up',
                            priority: 'medium'
                          });
                        }
                      }}
                      className="p-2 rounded-lg hover:bg-opacity-50 transition-colors"
                      style={{ backgroundColor: 'var(--bg-secondary)' }}
                    >
                      <Plus size={16} style={{ color: 'var(--color-primary)' }} />
                    </button>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {userProfile?.reminders?.filter(r => r.status === 'active')
                      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                      .slice(0, 10)
                      .map((reminder, index) => (
                      <div key={index} className="p-3 rounded-lg" style={{
                        backgroundColor: 'var(--bg-secondary)'
                      }}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                            {reminder.title}
                          </h4>
                          <span className={`px-2 py-1 rounded text-xs ${
                            reminder.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                            reminder.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                            reminder.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {reminder.priority}
                          </span>
                        </div>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          {reminder.type} • Due: {new Date(reminder.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Roadmaps Tab */}
              {activeTab === 'roadmaps' && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                      Career Roadmaps
                    </h3>
                    <button
                      onClick={() => {
                        const role = prompt('Enter the role for your roadmap:');
                        if (role) {
                          // This would typically open a roadmap generator or form
                          alert('Roadmap generator would open here. For now, you can save roadmaps from the roadmap generator page.');
                        }
                      }}
                      className="p-2 rounded-lg hover:bg-opacity-50 transition-colors"
                      style={{ backgroundColor: 'var(--bg-secondary)' }}
                    >
                      <Plus size={16} style={{ color: 'var(--color-primary)' }} />
                    </button>
                  </div>

                  {userProfile?.roadmapProgress ? (
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                            {userProfile.roadmapProgress.role}
                          </h4>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                // Edit roadmap - this would open an edit form
                                alert('Edit functionality would open here. You can modify your roadmap phases and tasks.');
                              }}
                              className="p-1 rounded hover:bg-opacity-50 transition-colors"
                              style={{ backgroundColor: 'var(--bg-tertiary)' }}
                            >
                              <Edit3 size={14} style={{ color: 'var(--color-primary)' }} />
                            </button>
                            <button
                              onClick={handleDeleteRoadmap}
                              className="p-1 rounded hover:bg-opacity-50 transition-colors"
                              style={{ backgroundColor: 'var(--bg-tertiary)' }}
                            >
                              <Trash2 size={14} style={{ color: 'var(--text-secondary)' }} />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {userProfile.roadmapProgress.phases?.map((phase, phaseIndex) => (
                            <div key={phaseIndex} className="border-l-2 pl-3" style={{
                              borderColor: phase.completed ? 'var(--color-success)' : 'var(--color-primary)'
                            }}>
                              <div className="flex items-center gap-2 mb-2">
                                <div className={`w-3 h-3 rounded-full ${
                                  phase.completed ? 'bg-green-500' : 'bg-blue-500'
                                }`}></div>
                                <h5 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                                  {phase.title}
                                </h5>
                                <span className="text-xs px-2 py-1 rounded" style={{
                                  backgroundColor: phase.completed ? 'var(--bg-success)' : 'var(--bg-primary)',
                                  color: phase.completed ? 'var(--text-success)' : 'var(--text-primary)'
                                }}>
                                  {phase.completed ? 'Completed' : 'In Progress'}
                                </span>
                              </div>

                              <div className="ml-5 space-y-1">
                                {phase.tasks?.map((task, taskIndex) => (
                                  <div key={taskIndex} className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      checked={task.completed || false}
                                      onChange={() => {
                                        // Update task completion status
                                        const updatedPhases = [...userProfile.roadmapProgress.phases];
                                        updatedPhases[phaseIndex].tasks[taskIndex].completed = !task.completed;
                                        handleUpdateRoadmap(userProfile.roadmapProgress.role, updatedPhases);
                                      }}
                                      className="rounded"
                                    />
                                    <span className={`text-sm ${
                                      task.completed ? 'line-through opacity-60' : ''
                                    }`} style={{ color: 'var(--text-secondary)' }}>
                                      {task.title}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
                          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                            Last updated: {new Date(userProfile.roadmapProgress.updatedAt || userProfile.roadmapProgress.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Map size={48} className="mx-auto mb-4 opacity-50" style={{
                        color: 'var(--text-secondary)'
                      }} />
                      <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                        No roadmaps saved yet
                      </p>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        Generate and save roadmaps from the roadmap generator page
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Activities Tab */}
              {activeTab === 'activities' && (
                <div className="p-6">
                  <div className="space-y-4">
                    {activities.length === 0 ? (
                      <div className="text-center py-8">
                        <Activity size={48} className="mx-auto mb-4 opacity-50" style={{
                          color: 'var(--text-secondary)'
                        }} />
                        <p style={{ color: 'var(--text-secondary)' }}>
                          No activities yet
                        </p>
                      </div>
                    ) : (
                      activities.map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-opacity-50 transition-colors"
                          style={{ backgroundColor: 'var(--bg-secondary)' }}
                        >
                          <div className="mt-1">
                            {getActivityIcon(activity.action)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                              {activity.description}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock size={12} style={{ color: 'var(--text-secondary)' }} />
                              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                                {formatDate(activity.timestamp)} at {new Date(activity.timestamp).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserActivitySidebar;
