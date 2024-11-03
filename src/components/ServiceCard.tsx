import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
      <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl">{service.icon}</span>
      </div>
      <h3 className="text-xl font-semibold mb-3">{service.name}</h3>
      <p className="text-gray-600">{service.description}</p>
    </div>
  );
}