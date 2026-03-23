import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  Users,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for contacting us! We will get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      color: "bg-blue-500/10 border-blue-500/20",
      iconColor: "text-blue-400",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@hopehome.com", "support@hopehome.com"],
      color: "bg-purple-500/10 border-purple-500/20",
      iconColor: "text-purple-400",
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Hope Street", "New York, NY 10001"],
      color: "bg-red-500/10 border-red-500/20",
      iconColor: "text-red-400",
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon-Fri: 9AM - 6PM", "Sat-Sun: 10AM - 4PM"],
      color: "bg-amber-500/10 border-amber-500/20",
      iconColor: "text-amber-400",
    },
  ];

  const supportOptions = [
    {
      icon: MessageSquare,
      title: "Live Chat",
      desc: "Chat with us in real-time",
      color: "bg-green-500/10 border-green-500/20",
      iconColor: "text-green-400",
    },
    {
      icon: Headphones,
      title: "Phone Support",
      desc: "Speak with our team",
      color: "bg-indigo-500/10 border-indigo-500/20",
      iconColor: "text-indigo-400",
    },
    {
      icon: Users,
      title: "Community",
      desc: "Join our forums",
      color: "bg-pink-500/10 border-pink-500/20",
      iconColor: "text-pink-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 md:p-12 text-center shadow-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In Touch
          </h1>
          <p className="text-green-100 text-lg md:text-xl max-w-2xl mx-auto">
            Have questions about Hope Home? We'd love to hear from you. Our team
            is here to help you every step of the way.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, index) => (
            <div
              key={index}
              className={`${item.color} border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300`}
            >
              <div className={`${item.iconColor} mb-4`}>
                <item.icon size={32} />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">
                {item.title}
              </h3>
              {item.details.map((detail, i) => (
                <p key={i} className="text-gray-600">
                  {detail}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Your@example.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="+2348086902551"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                >
                  <option value="">Select a topic</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="sales">Sales & Pricing</option>
                  <option value="partnership">Partnership</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                placeholder="Tell us how we can help you..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
            >
              <Send size={20} />
              Send Message
            </button>
          </form>
        </div>

        {/* Support Options & Additional Info */}
        <div className="space-y-8">
          {/* Support Options */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How Can We Help?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {supportOptions.map((option, index) => (
                <button
                  key={index}
                  className={`${option.color} border rounded-xl p-4 hover:shadow-lg transition-all duration-300 text-center`}
                >
                  <div
                    className={`${option.iconColor} mb-2 flex justify-center`}
                  >
                    <option.icon size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 text-xs mt-1">{option.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Preview */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Quick Answers
            </h2>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  What are your business hours?
                </h3>
                <p className="text-gray-600 text-sm">
                  Our support team is available Monday through Friday, 9AM to
                  6PM EST.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  How quickly do you respond?
                </h3>
                <p className="text-gray-600 text-sm">
                  We typically respond within 24 hours during business days.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Is there a free trial?
                </h3>
                <p className="text-gray-600 text-sm">
                  Yes! We offer a 14-day free trial for all new users with full
                  access to all features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Find Us
          </h2>
          <div className="bg-gray-200 rounded-xl h-64 md:h-80 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={48} className="text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Map integration coming soon</p>
              <p className="text-gray-400 text-sm">
                123 Hope Street, New York, NY 10001
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
