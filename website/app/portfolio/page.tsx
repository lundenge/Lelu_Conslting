'use client';

export default function Portfolio() {
  const opportunities = [
    {
      title: 'Smart Business Dashboard',
      description: 'Real-time reporting powered by AI and machine learning analytics. Track KPIs, visualize trends, and make data-driven decisions instantly.',
      technologies: ['Python', 'React', 'Power BI', 'Azure ML'],
      impact: 'Reduce decision-making time by 60%',
    },
    {
      title: 'Sales Prediction Platform',
      description: 'Forecast future revenue and market trends using historical data and machine learning models to improve sales planning.',
      technologies: ['Python', 'TensorFlow', 'SQL', 'AWS'],
      impact: 'Improve forecast accuracy by 45%',
    },
    {
      title: 'Customer Analytics Platform',
      description: 'Understand customer behavior using machine learning to identify patterns, preferences, and churn risk for targeted marketing.',
      technologies: ['Python', 'Scikit-learn', 'Tableau', 'MongoDB'],
      impact: 'Increase customer retention by 35%',
    },
    {
      title: 'AI Chatbot Solution',
      description: 'Automate customer support 24/7 with intelligent conversational AI. Reduce support costs while improving customer satisfaction.',
      technologies: ['Node.js', 'OpenAI', 'Python', 'Azure'],
      impact: 'Handle 80% of inquiries automatically',
    },
    {
      title: 'Inventory Forecasting System',
      description: 'Reduce stock shortages and overstock situations using predictive analytics to optimize inventory levels.',
      technologies: ['Python', 'Pandas', 'SQL', 'AWS'],
      impact: 'Reduce carrying costs by 25%',
    },
    {
      title: 'Fraud Detection System',
      description: 'Identify suspicious financial transactions in real-time using machine learning algorithms to protect your business.',
      technologies: ['Python', 'Machine Learning', 'Real-time Streaming', 'Azure'],
      impact: 'Detect 99% of fraudulent transactions',
    },
    {
      title: 'HR Analytics Platform',
      description: 'Predict employee turnover and identify recruitment needs using data analytics to optimize human resources.',
      technologies: ['Python', 'Power BI', 'SQL', 'React'],
      impact: 'Reduce turnover by 20%',
    },
    {
      title: 'Smart Agriculture Platform',
      description: 'Use AI to predict crop diseases, optimize irrigation, and improve yields through intelligent agricultural solutions.',
      technologies: ['Python', 'Computer Vision', 'IoT', 'AWS'],
      impact: 'Increase crop yield by 30%',
    },
    {
      title: 'Medical Decision Support',
      description: 'Assist healthcare providers with AI-driven diagnostic support and patient outcome prediction systems.',
      technologies: ['Python', 'Deep Learning', 'HIPAA-compliant Cloud', 'Azure'],
      impact: 'Improve diagnostic accuracy by 25%',
    },
    {
      title: 'Predictive Maintenance System',
      description: 'Monitor equipment and predict failures before they occur using machine learning to minimize downtime.',
      technologies: ['Python', 'IoT', 'Real-time Analytics', 'AWS'],
      impact: 'Reduce equipment downtime by 40%',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 md:py-24">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-4">AI-Powered Solutions</h1>
          <p className="text-xl text-gray-300">
            Real-world applications that drive business transformation
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {opportunities.map((opportunity, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:shadow-xl hover:border-blue-600 transition-all"
              >
                <h3 className="text-2xl font-bold mb-3 text-blue-600">{opportunity.title}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{opportunity.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 border-l-4 border-green-600 pl-4 py-3">
                  <p className="text-green-800 font-semibold">{opportunity.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Competitive Advantages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'End-to-End Expertise',
                description: 'Software development, AI implementation, and data analytics all under one roof',
              },
              {
                title: 'AI-Driven Solutions',
                description: 'Intelligent automation and predictive capabilities integrated into every solution',
              },
              {
                title: 'Customized Approach',
                description: 'Tailored solutions designed specifically for your business needs and goals',
              },
              {
                title: 'Strong Data Analytics',
                description: 'Transform data into valuable business insights and actionable intelligence',
              },
              {
                title: 'Cloud-Native Development',
                description: 'Scalable and secure applications built on Azure and AWS platforms',
              },
              {
                title: 'Cost-Effective Solutions',
                description: 'Affordable technology solutions especially designed for SMEs and startups',
              },
            ].map((advantage, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-blue-600">{advantage.title}</h3>
                <p className="text-gray-700">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue Streams */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-12 text-center">How We Create Value</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Software Development Projects',
              'AI Consulting Services',
              'Data Analytics Consulting',
              'Business Intelligence Dashboards',
              'Cloud Migration Services',
              'AI Model Development',
              'Software Maintenance Contracts',
              'Subscription-based AI Platforms (SaaS)',
              'Corporate Training Programs',
              'Technical Support Services',
            ].map((revenue, index) => (
              <div key={index} className="bg-blue-50 p-6 rounded-lg flex items-start gap-4">
                <span className="text-2xl text-blue-600 font-bold">✓</span>
                <p className="text-gray-800 font-semibold">{revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-blue-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Interested in a Custom Solution?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Let&apos;s discuss how one of these solutions can be customized for your specific business needs.
          </p>
          <a href="/contact" className="btn-secondary inline-block">
            Request a Consultation
          </a>
        </div>
      </section>
    </div>
  );
}
