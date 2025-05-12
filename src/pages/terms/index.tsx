import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

const TermsPage: React.FC = () => {
  return (
    <Layout title="Terms of Service | VAI Ecosystem" description="Terms of Service for the VAI ecosystem">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <div className="card">
          <div className="card-body prose prose-lg dark:prose-invert max-w-none">
            <p>Last Updated: June 1, 2025</p>
            
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the VAI Ecosystem ("Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
            
            <h2>2. Description of Service</h2>
            <p>
              The VAI Ecosystem is a decentralized platform that enables users to participate in knowledge curation, governance, and value creation through various activities including but not limited to staking tokens, creating and voting on proposals, completing tasks, and participating in fields.
            </p>
            
            <h2>3. Eligibility</h2>
            <p>
              To use the Service, you must be at least 18 years old and capable of forming a binding contract. By using the Service, you represent and warrant that you meet these requirements.
            </p>
            
            <h2>4. User Accounts</h2>
            <p>
              To interact with the VAI Ecosystem, you need a Web3 wallet compatible with our platform. You are responsible for maintaining the security of your wallet and private keys.
            </p>
            
            <h2>5. User Conduct</h2>
            <p>
              You agree not to use the Service for any illegal or unauthorized purpose. You agree to comply with all applicable laws and regulations.
            </p>
            <p>
              Prohibited activities include but are not limited to:
            </p>
            <ul>
              <li>Engaging in fraudulent or deceptive practices</li>
              <li>Attempting to manipulate governance processes</li>
              <li>Submitting false or misleading information</li>
              <li>Engaging in activities that harm the ecosystem</li>
              <li>Violating the rights of others</li>
              <li>Interfering with the proper functioning of the Service</li>
            </ul>
            
            <h2>6. Intellectual Property</h2>
            <p>
              Content submitted to the VAI Ecosystem may be subject to different intellectual property arrangements depending on the context:
            </p>
            <ul>
              <li>Content submitted for tasks may be subject to specific terms defined in the task description</li>
              <li>Governance proposals and discussions are generally available for public review</li>
              <li>Code contributions may be subject to open source licenses</li>
            </ul>
            
            <h2>7. Tokens and Digital Assets</h2>
            <p>
              VAI tokens and other digital assets within the ecosystem:
            </p>
            <ul>
              <li>Are not securities or investments</li>
              <li>Have utility within the ecosystem as described in the whitepaper</li>
              <li>May fluctuate in value based on various factors</li>
              <li>Are not guaranteed to have any particular value outside the ecosystem</li>
            </ul>
            
            <h2>8. Risk Disclosure</h2>
            <p>
              Participation in the VAI Ecosystem involves risks, including but not limited to:
            </p>
            <ul>
              <li>Smart contract risks and potential vulnerabilities</li>
              <li>Regulatory uncertainty</li>
              <li>Market volatility</li>
              <li>Technical risks including potential bugs or exploits</li>
            </ul>
            <p>
              You acknowledge these risks and agree to participate at your own risk.
            </p>
            
            <h2>9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, the VAI Ecosystem, its developers, and contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Service.
            </p>
            
            <h2>10. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective upon posting to the Service. Your continued use of the Service after changes indicates your acceptance of the modified Terms.
            </p>
            
            <h2>11. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the primary developers of the VAI Ecosystem are located, without regard to its conflict of law provisions.
            </p>
            
            <h2>12. Contact Information</h2>
            <p>
              For questions about these Terms, please contact us at legal@vaiecosystem.io.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;