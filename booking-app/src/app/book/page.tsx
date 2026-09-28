'use client';

import React, { useState } from 'react';
import ServiceSelection from '@/components/booking/ServiceSelection';
import { Service } from '@/components/booking/ServiceSelection';
import { Calendar, User, CreditCard, CheckCircle } from 'lucide-react';

type Step = 'service' | 'time' | 'details' | 'payment' | 'success';

export default function BookingPage() {
  const [step, setStep] = useState<Step>('service');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const nextStep = () => {
    if (step === 'service') setStep('time');
    else if (step === 'time') setStep('details');
    else if (step === 'details') setStep('payment');
    else if (step === 'payment') setStep('success');
  };

  const prevStep = () => {
    if (step === 'time') setStep('service');
    else if (step === 'details') setStep('time');
    else if (step === 'payment') setStep('details');
  };

  return (
    <div className="min-h-screen bg-pink-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-pink-100 p-6 text-center">
        <h1 className="text-3xl font-extrabold text-pink-600 tracking-tight">Nail Authenticity</h1>
        <p className="text-gray-500 text-sm">Book your professional nail artistry session</p>
      </header>

      {/* Progress Stepper */}
      <div className="max-w-3xl mx-auto mt-8 px-4">
        <div className="flex justify-between items-center relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-pink-200 -z-10"></div>
          
          {[
            { id: 'service', icon: <CheckCircle2 size={20} />, label: 'Service' },
            { id: 'time', icon: <Calendar size={20} />, label: 'Time' },
            { id: 'details', icon: <User size={20} />, label: 'Details' },
            { id: 'payment', icon: <CreditCard size={20} />, label: 'Payment' },
          ].map((s, idx) => (
            <div key={s.id} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                (step === s.id || ['service', 'time', 'details', 'payment'].indexOf(s.id) < ['service', 'time', 'details', 'payment'].indexOf(step)) 
                ? 'bg-pink-500 text-white' : 'bg-white text-gray-400 border border-pink-200'
              }`}>
                {s.icon}
              </div>
              <span className="text-xs font-medium text-gray-600">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto mt-12 px-4 pb-24">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-pink-100">
          {step === 'service' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-center">Select a Service</h2>
              <ServiceSelection onSelect={(s) => { setSelectedService(s); nextStep(); }} />
            </div>
          )}

          {step === 'time' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Choose Date & Time</h2>
              <CalendarPicker 
                selectedService={selectedService} 
                onSelectTime={(date) => { 
                  setSelectedTime(date.toISOString()); 
                  nextStep(); 
                }} 
              />
            </div>
          )}

          {step === 'details' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6 text-center">Your Information</h2>
              <div className="grid grid-cols-1 gap-4">
                <input type="text" placeholder="Full Name" className="p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-400 outline-none" />
                <input type="email" placeholder="Email Address" className="p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-400 outline-none" />
                <input type="tel" placeholder="Phone Number" className="p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-400 outline-none" />
              </div>
              <button 
                onClick={nextStep}
                className="w-full bg-pink-500 text-white py-4 rounded-xl font-bold hover:bg-pink-600 transition-colors"
              >
                Proceed to Payment
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="text-center py-12">
              <CreditCard size={48} className="mx-auto text-pink-400 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Secure Deposit</h2>
              <p className="text-gray-500 mb-8">A small deposit is required to secure your {selectedService?.name}.</p>
              <button 
                onClick={nextStep}
                className="bg-pink-500 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-600 transition-colors"
              >
                Pay Deposit (Demo)
              </button>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} />
              </div>
              <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
              <p className="text-gray-500 mb-8">We can't wait to see you. Check your email for details.</p>
              <button 
                onClick={() => setStep('service')}
                className="text-pink-600 font-semibold hover:underline"
              >
                Book another appointment
              </button>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {step !== 'success' && (
          <div className="mt-8 flex justify-between items-center px-4">
            <button 
              onClick={prevStep} 
              disabled={step === 'service'}
              className={`text-gray-500 font-medium ${step === 'service' ? 'opacity-0 pointer-events-none' : 'hover:text-pink-600'}`}
            >
              ← Back
            </button>
            <div className="text-sm text-gray-400">
              Step {['service', 'time', 'details', 'payment'].indexOf(step) + 1} of 4
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function CheckCircle2({ size }: { size: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
}
