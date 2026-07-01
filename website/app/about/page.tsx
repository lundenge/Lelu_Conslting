'use client';

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 md:py-24">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-4">About Lelu-Consulting</h1>
          <p className="text-xl text-gray-300">
            Innovative technology consulting for digital transformation
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 gradient-text">Our Vision</h2>
              <p className="text-lg text-gray-700">
                To become a trusted global leader in Artificial Intelligence, Software Engineering, and Data Analytics by empowering organizations with intelligent, data-driven technology solutions.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 gradient-text">Our Mission</h2>
              <p className="text-lg text-gray-700">
                To design and implement innovative software, AI, and analytics solutions that solve real-world challenges, improve productivity, reduce operational costs, and enable smarter business decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-16 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '💡', title: 'Innovation', desc: 'Cutting-edge solutions and continuous improvement' },
              { icon: '🤝', title: 'Integrity', desc: 'Transparent and honest partnerships' },
              { icon: '🎯', title: 'Customer Success', desc: 'Your goals are our success metrics' },
              { icon: '📚', title: 'Continuous Learning', desc: 'Staying ahead of technology trends' },
              { icon: '👥', title: 'Collaboration', desc: 'Teamwork and client partnership' },
              { icon: '⭐', title: 'Excellence', desc: 'Quality in everything we deliver' },
              { icon: '📊', title: 'Data-Driven', desc: 'Evidence-based decision making' },
              { icon: '🚀', title: 'Growth Mindset', desc: 'Scaling solutions for future success' },
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Profile */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-12 text-center">Meet Our Founder</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 p-12 rounded-lg">
              <div className="text-center mb-8">
                <div className="w-32 h-32 mx-auto bg-blue-600 rounded-full flex items-center justify-center text-white text-6xl mb-6">
                  TL
                </div>
                <h3 className="text-3xl font-bold mb-2">Theophile Lundenge</h3>
                <p className="text-xl text-blue-600 font-semibold">Founder &amp; CEO</p>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Theophile Lundenge is a Software Engineer, AI Specialist, and Data Analytics Consultant with a Bachelor&apos;s degree in Computer Engineering and over seven years of experience in software development, engineering leadership, and AI-driven innovation.
              </p>
              <div className="space-y-4">
                <h4 className="font-bold text-lg">Expertise Areas:</h4>
                <ul className="grid grid-cols-2 gap-4 text-gray-700">
                  <li>✓ Software Engineering</li>
                  <li>✓ Machine Learning</li>
                  <li>✓ Cloud Technologies</li>
                  <li>✓ Data Analytics</li>
                  <li>✓ Business Automation</li>
                  <li>✓ Digital Transformation</li>
                </ul>
              </div>
              <p className="text-gray-700 mt-8 italic">
                Passionate about creating intelligent solutions that help organizations improve efficiency, make better decisions, and unlock the value of their data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements & Stats */}
      <section className="py-20 md:py-32 bg-blue-600 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '7+', label: 'Years of Experience' },
              { number: '50+', label: 'Successful Projects' },
              { number: '30+', label: 'Technology Stack' },
              { number: '100%', label: 'Client Satisfaction' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Stand Out */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-16 text-center">Why We Stand Out</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: 'End-to-End Expertise',
                description: 'From software development to AI implementation and data analytics, we cover the full technology spectrum.',
              },
              {
                title: 'AI-Driven Solutions',
                description: 'We integrate artificial intelligence into solutions to provide intelligent, automated, and predictive capabilities.',
              },
              {
                title: 'Customized Approach',
                description: 'No one-size-fits-all solutions. We tailor every engagement to your specific business needs and goals.',
              },
              {
                title: 'Strong Data Analytics',
                description: 'Transform your data into actionable insights with advanced analytics and business intelligence.',
              },
              {
                title: 'Cloud-Native Development',
                description: 'Build scalable, secure, and cost-effective applications on Azure, AWS, and other cloud platforms.',
                },
              {
                title: 'Continuous Support',
                description: 'Beyond implementation, we provide ongoing support, training, and optimization of your solutions.',
              },
            ].map((item, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold mb-4 text-blue-600">{item.title}</h3>
                <p className="text-gray-700 text-lg">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
