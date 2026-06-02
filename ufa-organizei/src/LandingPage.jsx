import dashboardImg from './assets/PrtSc/Dashboard.png'

import React from 'react'
import {
    ArrowRight,
    CalendarCheck,
    BookOpen,
    Newspaper,
    Flame,
    Target,
    CheckSquare,
    Shield,
    Zap,
    Cloud,
    Lock,
    ChevronDown,
    LogIn
} from 'lucide-react'

function UfaLogo({ className = 'w-10 h-10' }) {
    return (
        <svg className={className} viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 6 H36 L46 16 V50 Q46 54 42 54 H10 Q6 54 6 50 V10 Q6 6 10 6 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
            <path d="M36 6 L36 16 L46 16" fill="none" stroke="#D3AF37" strokeWidth="3" strokeLinejoin="round" />
            <circle cx="16" cy="23" r="2.2" fill="currentColor" />
            <line x1="21" y1="23" x2="36" y2="23" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="16" cy="31" r="2.2" fill="currentColor" />
            <line x1="21" y1="31" x2="36" y2="31" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="16" cy="39" r="2.2" fill="currentColor" />
            <line x1="21" y1="39" x2="33" y2="39" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M18 47 L26 55 L44 36" fill="none" stroke="#D3AF37" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default function LandingPage({ onAccessApp }) {
    const features = [
        {
            icon: CheckSquare,
            title: 'Tarefas Inteligentes',
            text: 'Crie, organize e acompanhe suas tarefas acadêmicas de forma eficiente.'
        },
        {
            icon: CalendarCheck,
            title: 'Agenda Completa',
            text: 'Visualize seus compromissos e nunca mais perca um prazo importante.'
        },
        {
            icon: BookOpen,
            title: 'Materiais Organizados',
            text: 'Salve e organize seus materiais de estudo na nuvem com segurança.'
        },
        {
            icon: Newspaper,
            title: 'Notícias Automáticas',
            text: 'Fique por dentro das atualizações acadêmicas importadas automaticamente.'
        },
        {
            icon: Flame,
            title: 'Streak de Estudos',
            text: 'Mantenha a consistência e construa hábitos de estudo todos os dias.'
        },
        {
            icon: Target,
            title: 'Metas e Produtividade',
            text: 'Defina metas semanais e acompanhe seu progresso em tempo real.'
        }
    ]

    return (
        <div className="min-h-screen bg-white text-[#1a2e26] overflow-hidden">

            {/* HEADER */}
            <header className="h-20 bg-white border-b border-[#e8ede9] flex items-center justify-between px-8 lg:px-16 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#e8f5ef] text-[#00674F] flex items-center justify-center">
                        <UfaLogo className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-base font-black leading-none tracking-tight">UFA ORGANIZEI <span className="text-[#D3AF37] text-sm">+</span></h1>
                        <p className="text-[10px] text-[#5a6b63] mt-0.5">Sua vida acadêmica organizada.</p>
                    </div>
                </div>

                <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#344d43]">
                    <a href="#inicio" className="text-[#00674F] border-b-2 border-[#00674F] pb-0.5">Início</a>
                    <a href="#recursos" className="hover:text-[#00674F] transition-colors">Recursos</a>
                    <a href="#sobre" className="hover:text-[#00674F] transition-colors">Sobre</a>
                    <a href="#faq" className="hover:text-[#00674F] transition-colors">Perguntas frequentes</a>
                    <a href="#contato" className="hover:text-[#00674F] transition-colors">Contato</a>
                </nav>

                <button
                    onClick={onAccessApp}
                    className="bg-[#00674F] text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#005040] transition-all shadow-md"
                >
                    <LogIn size={16} />
                    Acessar app
                </button>
            </header>

            {/* HERO */}
            <main id="inicio" className="relative bg-white">
                {/* Decoração verde escuro no canto superior direito */}
                <div className="absolute top-0 right-0 w-[340px] h-[340px] rounded-bl-[80px] bg-[#003d2e] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[220px] h-[220px] bg-[#e8f5ef] pointer-events-none" />

                <div className="relative px-8 lg:px-16 pt-16 pb-16 w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-16 items-center">
                    <div className="relative z-10">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e8f5ef] text-[#00674F] text-xs font-bold mb-6 border border-[#c2ddd2]">
                            🎓 Feito para estudantes, por estudantes
                        </span>

                        <h2 className="text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight mb-6">
                            Organize sua vida acadêmica em um só lugar.
                        </h2>

                        <p className="text-base text-[#5a6b63] leading-relaxed max-w-xl mb-8">
                            Gerencie tarefas, acompanhe sua agenda, salve materiais, fique por dentro das notícias
                            e alcance seus objetivos acadêmicos com o UFA ORGANIZEI.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 mb-8">
                            <button
                                onClick={onAccessApp}
                                className="bg-[#00674F] text-white px-7 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#005040] transition-all shadow-lg"
                            >
                                Começar agora
                                <ArrowRight size={17} />
                            </button>

                            <a
                                href="#recursos"
                                className="bg-white border border-[#d9e3de] px-7 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#f0f5f2] transition-all text-[#1a2e26]"
                            >
                                Ver recursos
                                <ChevronDown size={16} />
                            </a>
                        </div>

                        <div className="flex flex-wrap gap-5 text-xs text-[#5a6b63]">
                            <span className="flex items-center gap-1.5"><Shield size={14} className="text-[#00674F]" /> Seguro</span>
                            <span className="flex items-center gap-1.5"><Zap size={14} className="text-[#00674F]" /> Rápido</span>
                            <span className="flex items-center gap-1.5"><Cloud size={14} className="text-[#00674F]" /> Acessível de qualquer lugar</span>
                            <span className="flex items-center gap-1.5"><Lock size={14} className="text-[#00674F]" /> Seus dados protegidos</span>
                        </div>
                    </div>

                    {/* Mockup do dashboard com estilo browser */}
                    <div className="relative z-10">
                        <div className="w-full rounded-2xl shadow-2xl border border-[#e0e7e3] overflow-hidden bg-white">
                            {/* Barra do browser */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-[#f3f6f4] border-b border-[#e0e7e3]">
                                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                                <div className="ml-3 flex-1 bg-white rounded-md px-3 py-1 text-[10px] text-[#9aada5] border border-[#e0e7e3]">
                                    app.ufaorganizei.com.br
                                </div>
                            </div>
                            <img
                                src={dashboardImg}
                                alt="Dashboard UFA Organizei"
                                className="w-full block"
                            />
                        </div>
                    </div>
                </div>
            </main>

            {/* RECURSOS */}
            <section id="recursos" className="px-8 lg:px-16 py-16 bg-[#F5F7F6]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-[#e8f5ef] text-[#00674F] text-xs font-bold mb-4 border border-[#c2ddd2]">
                            🎓 Tudo que você precisa
                        </span>
                        <h2 className="text-3xl font-black">Recursos que fazem a diferença</h2>
                        <p className="text-[#5a6b63] mt-2 text-sm">Ferramentas completas para otimizar sua rotina acadêmica</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map(({ icon: Icon, title, text }) => (
                            <div key={title} className="bg-white border border-[#e8ede9] rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                                <div className="w-12 h-12 rounded-2xl bg-[#e8f5ef] text-[#00674F] flex items-center justify-center mb-5">
                                    <Icon size={22} />
                                </div>
                                <h3 className="font-bold text-base mb-2">{title}</h3>
                                <p className="text-sm text-[#5a6b63] leading-relaxed">{text}</p>
                                <div className="w-8 h-1 bg-[#D3AF37] rounded-full mt-5" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section id="sobre" className="px-8 lg:px-16 py-14">
                <div className="max-w-6xl mx-auto bg-[#003d2e] rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-full bg-[#00674F] flex items-center justify-center shrink-0">
                            <UfaLogo className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white mb-1">Pronto para transformar sua rotina acadêmica?</h2>
                            <p className="text-white/70 text-sm">Junte-se com os estudantes que já organizam seus estudos com o UFA ORGANIZEI.</p>
                        </div>
                    </div>

                    <button
                        onClick={onAccessApp}
                        className="bg-[#D3AF37] text-white px-7 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#b8942a] transition-all whitespace-nowrap shrink-0"
                    >
                        Acessar app agora
                        <ArrowRight size={17} />
                    </button>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-[#003d2e] text-white px-8 lg:px-16 py-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#00674F] flex items-center justify-center">
                            <UfaLogo className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="font-black text-sm">UFA ORGANIZEI <span className="text-[#D3AF37]">+</span></p>
                            <p className="text-[10px] text-white/60">Sua vida acadêmica organizada.</p>
                        </div>
                    </div>

                    <p className="text-xs text-white/60">© 2025 UFA ORGANIZEI. Todos os direitos reservados.</p>

                    <div className="flex items-center gap-4 text-white/70">
                    </div>
                </div>
            </footer>
        </div>
    )
}
