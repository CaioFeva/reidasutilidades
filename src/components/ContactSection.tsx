import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contato" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Entre em Contato
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-red-600 p-3 rounded-full text-white">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Localização</h3>
                <p className="text-gray-600">St. M QNM 17 Lj 02 - Ceilândia</p>
                <p className="text-gray-600">Brasília - DF</p>
                <p className="text-gray-600">72215-171</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-red-600 p-3 rounded-full text-white">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Telefone</h3>
                <a
                  href="tel:+5561981388985"
                  className="text-gray-600 hover:text-red-600"
                >
                  (61) 98138-8985
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-red-600 p-3 rounded-full text-white">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">E-mail</h3>
                <a
                  href="mailto:sobreirautilidades@gmail.com.br"
                  className="text-gray-600 hover:text-red-600"
                >
                  sobreirautilidades@gmail.com.br
                </a>
              </div>
            </div>
          </div>

          <div className="h-[400px] rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3838.7496683840322!2d-48.103499124079725!3d-15.817148323517362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935bcd32b2359f31%3A0xefb17342d4d8a506!2sRei%20das%20Utilidades!5e0!3m2!1spt-BR!2sbr!4v1730736344721!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
