import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

const PrivacyPage: React.FC = () => {
  return (
    <Layout title="Privacy Policy | VAI Ecosystem" description="Privacy Policy for the VAI ecosystem">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="card">
          <div className="card-body prose prose-lg dark:prose-invert max-w-none">
            <p>Last Updated: June 1, 2025</p>
            
            <h2>1. Introduction</h2>
            <p>
              This Privacy Policy explains how the VAI Ecosystem ("we", "our", or "us") collects, uses, and shares data when you use our decentralized application or website (collectively, the "Service").
            </p>
            <p>
              We are committed to respecting your privacy and protecting your data while providing a transparent explanation of our practices.
            </p>
            
            <h2>2. Information We Collect</h2>
            <p>
              As a decentralized application, we minimize data collection. However, we may collect:
            </p>
            <ul>
              <li><strong>Blockchain Information:</strong> Public blockchain data including wallet addresses, transaction history, and smart contract interactions within the VAI Ecosystem.</li>
              <li><strong>Usage Information:</strong> Information about how you interact with our Service, including pages visited, features used, and actions taken.</li>
              <li><strong>Device Information:</strong> Information about your device, such as IP address, browser type, and operating system.</li>
              <li><strong>Cookies and Similar Technologies:</strong> We may use cookies and similar technologies to enhance your experience and collect usage information.</li>
            </ul>
            
            <h2>3. How We Use Information</h2>
            <p>
              We use the information we collect for the following purposes:
            </p>
            <ul>
              <li>To provide and maintain the Service</li>
              <li>To improve and optimize the Service</li>
              <li>To understand how users interact with the Service</li>
              <li>To detect, prevent, and address technical or security issues</li>
              <li>To comply with legal obligations</li>
            </ul>
            
            <h2>4. Information Sharing</h2>
            <p>
              We may share information in the following circumstances:
            </p>
            <ul>
              <li><strong>Public Blockchain Data:</strong> Information recorded on public blockchains is inherently public and accessible to anyone.</li>
              <li><strong>Service Providers:</strong> We may share information with third-party service providers that help us operate the Service.</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal processes.</li>
              <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
            </ul>
            
            <h2>5. Blockchain Transparency</h2>
            <p>
              Please note that blockchain technology is inherently transparent. When you interact with the VAI Ecosystem:
            </p>
            <ul>
              <li>Your wallet address and transaction details are publicly visible on the blockchain</li>
              <li>Smart contract interactions are recorded and visible on the blockchain</li>
              <li>While your wallet address does not directly identify you, it may be possible to associate your address with your identity through various means</li>
            </ul>
            
            <h2>6. Your Choices and Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul>
              <li>Right to access the information we have about you</li>
              <li>Right to correct inaccurate information</li>
              <li>Right to request deletion of certain information</li>
              <li>Right to restrict or object to certain processing</li>
              <li>Right to data portability</li>
            </ul>
            <p>
              Please note that information recorded on public blockchains cannot be altered or deleted due to the nature of blockchain technology.
            </p>
            
            <h2>7. Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the information we collect. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            
            <h2>8. International Transfers</h2>
            <p>
              Your information may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ.
            </p>
            
            <h2>9. Children's Privacy</h2>
            <p>
              The Service is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18, we will take steps to delete that information.
            </p>
            
            <h2>10. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@vaiecosystem.io.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPage;