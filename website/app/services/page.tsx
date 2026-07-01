'use client';

export default function Services() {
  const mainServices = [
    {
      title: 'Software Engineering',
      icon: '💻',
      description: 'We design and develop modern software applications tailored to your business needs.',
      offerings: [
        'Web applications',
        'Mobile applications',
        'Enterprise software',
        'Cloud applications',
        'APIs & Microservices',
        'Database design',
        'System integration',
        'Software maintenance',
      ],
      technologies: ['Python', 'JavaScript', 'React', 'Node.js', 'ASP.NET', 'C#', 'PHP', 'SQL', 'MongoDB', 'Azure', 'AWS'],
    },
    {
      title: 'Artificial Intelligence & Machine Learning',
      icon: '🤖',
      description: 'Build intelligent solutions capable of learning from data and making smart predictions.',
      offerings: [
        'Predictive Analytics',
        'Machine Learning Models',
        'Recommendation Systems',
        'Computer Vision',
        'Natural Language Processing (NLP)',
        'AI Chatbots',
        'Intelligent Document Processing',
        'Fraud Detection',
        'Demand Forecasting',
        'Customer Behaviour Analysis',
      ],
      technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Python', 'OpenAI', 'Azure ML', 'AWS SageMaker'],
    },
    {
      title: 'Data Analytics',
      icon: '📊',
      description: 'Transform your data into valuable business insights and actionable intelligence.',
      offerings: [
        'Business Intelligence Dashboards',
        'KPI Reporting',
        'Data Visualization',
        'ETL Pipelines',
        'Data Cleaning',
        'Statistical Analysis',
        'Big Data Processing',
        'Data Warehousing',
        'Executive Reporting',
      ],
      technologies: ['Power BI', 'Tableau', 'Python', 'SQL', 'Excel', 'Pandas', 'NumPy'],
    },
    {
      title: 'Business Process Automation',
      icon: '⚙️',
      description: 'Automate repetitive tasks using AI and software to improve efficiency.',
      offerings: [
        'Invoice Automation',
        'HR Automation',
        'Customer Service Automation',
        'Inventory Automation',
        'Workflow Automation',
        'Email Automation',
        'Reporting Automation',
      ],
      technologies: ['RPA', 'Python', 'Node.js', 'Azure Logic Apps', 'AWS Automation'],
    },
    {
      title: 'AI Consulting',
      icon: '🎯',
      description: 'Help your organization adopt Artificial Intelligence strategically and effectively.',
      offerings: [
        'AI Readiness Assessment',
        'AI Strategy Development',
        'Digital Transformation',
        'AI Roadmaps',
        'AI Governance',
        'AI Risk Assessment',
        'AI Ethics Consulting',
      ],
      technologies: ['Enterprise Architecture', 'Business Analysis', 'Strategic Planning'],
    },
    {
      title: 'Cloud Solutions',
      icon: '☁️',
      description: 'Cloud migration and infrastructure services for scalable and secure applications.',
      offerings: [
        'Microsoft Azure',
        'Amazon Web Services (AWS)',
        'Cloud Architecture',
        'DevOps',
        'CI/CD Pipelines',
        'Kubernetes',
        'Docker',
        'Serverless Computing',
      ],
      technologies: ['Azure', 'AWS', 'Docker', 'Kubernetes', 'Terraform', 'Git'],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 md:py-24">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-gray-300">
            Comprehensive technology solutions for every business need
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          <div className="space-y-20">
            {mainServices.map((service, index) => (
              <div key={index} className="border-b pb-16 last:border-b-0">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl">{service.icon}</div>
                  <div>
                    <h2 className="text-4xl font-bold">{service.title}</h2>
                    <p className="text-gray-600 text-lg mt-2">{service.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">What We Offer</h3>
                    <ul className="space-y-3">
                      {service.offerings.map((offering, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-blue-600 font-bold text-xl mt-1">•</span>
                          <span className="text-gray-700">{offering}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-6">Technologies</h3>
                    <div className="flex flex-wrap gap-3">
                      {service.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Clients */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-12 text-center">Who We Serve</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              'Small Businesses',
              'Medium Enterprises',
              'Large Corporations',
              'Government Agencies',
              'Non-Profit Organizations',
              'Healthcare Providers',
              'Schools & Universities',
              'Manufacturing Companies',
              'Retail Businesses',
              'Agricultural Organizations',
              'Financial Institutions',
              'Logistics Companies',
              'Startups',
              'Tech Companies',
            ].map((client, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-lg font-semibold text-gray-800 text-center">{client}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-12 text-center">Industries We Serve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Healthcare',
              'Finance',
              'Agriculture',
              'Education',
              'Manufacturing',
              'Mining',
              'Logistics',
              'Retail',
              'Telecommunications',
              'Government',
              'Smart Cities',
              'Renewable Energy',
            ].map((industry, index) => (
              <div key={index} className="bg-blue-50 p-8 rounded-lg border-l-4 border-blue-600">
                <p className="text-xl font-semibold text-gray-800">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-blue-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Contact us today to discuss how we can help transform your business with innovative technology solutions.
          </p>
          <a href="/contact" className="btn-secondary inline-block">
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
