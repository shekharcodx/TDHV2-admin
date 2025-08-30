import React, { useEffect, useState } from "react";

import EmailTemplateForm from "../../components/EmailTemplate/EmailTemplateFormC";
import EmailTemplateModal from "../../components/EmailTemplate/EmailTemplateFormC";
import { useAllEmailTemplatesQuery } from "../../Services/emailTamplatesAPI";

const EmailTemplate = () => {
  const { data, isLoading, error } = useAllEmailTemplatesQuery();
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    if (data) {
      setEmailTemplates(data.data);
    }
  }, [data]);

  const truncateText = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const cleanHtml = (htmlString) => {
    // Remove HTML tags and extra whitespace for display
    return htmlString
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const handleRowClick = (template) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTemplate(null);
  };

  const handleFormSubmit = (formData) => {
    if (selectedTemplate) {
      // Update existing template
      setEmailTemplates((prev) =>
        prev.map((template) =>
          template._id === selectedTemplate._id
            ? { ...template, ...formData }
            : template
        )
      );
      console.log("Template updated:", formData);
    } else {
      // Create new template
      const newTemplate = {
        ...formData,
        _id: Date.now().toString(), // Simple ID generation for demo
      };
      setEmailTemplates((prev) => [...prev, newTemplate]);
      console.log("Template created:", formData);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <div className="p-6 bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Email Templates
            </h2>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Template Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Body Preview
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {emailTemplates.map((template) => (
                      <tr
                        key={template._id}
                        onClick={() => handleRowClick(template)}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {template.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {template.subject}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs">
                            {template.description}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className="text-sm text-gray-600 max-w-md cursor-pointer hover:text-gray-900"
                            title={cleanHtml(template.body)}
                          >
                            {truncateText(cleanHtml(template.body), 60)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              template.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {template.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {emailTemplates.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg">
                    No email templates found
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <EmailTemplateModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        templateData={selectedTemplate}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default EmailTemplate;
