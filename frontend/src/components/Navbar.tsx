import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import logo from '../assets/logo-icon.png';

export default function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const nav = [
    { href: '#hero', label: t('nav.home') as string },
    { href: '#jobs', label: t('nav.jobs') as string },
    { href: '#contact', label: t('nav.contact') as string },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* logo */}
        <a href="#" className="flex items-center gap-3 select-none">
          <img src={logo} alt="Bulstaff logo" className="h-10 w-10" />
          <span className="font-heading text-2xl md:text-3xl font-extrabold text-primary">
            BULSTAFF
          </span>
        </a>

        {/* desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {nav.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-lg font-medium text-primary hover:text-accentRed transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* desktop lang switcher */}
        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>

        {/* burger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-accentGreen"
        >
          {open ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
        </button>
      </div>

      {/* mobile panel */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="px-6 py-4 flex flex-col gap-5">
            {nav.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="text-lg text-primary hover:text-accentRed"
              >
                {label}
              </a>
            ))}
            <LanguageSwitcher />
          </nav>
        </div>
      )}
    </header>
  );
}
