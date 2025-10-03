import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Play, Download, Users, Clock, Target, Zap, CheckCircle2, Star, MessageCircle, Copy, ArrowRight, Sparkles, TrendingUp, Shield, Gift, Rocket } from "lucide-react";
import whatsapp01 from "@/assets/whatsapp-01.png";
import whatsapp02 from "@/assets/whatsapp-02.png";
import whatsapp03 from "@/assets/whatsapp-03.png";
import whatsapp04 from "@/assets/whatsapp-04.png";

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: ""
  });
  const [counters, setCounters] = useState({
    launches: 0,
    leads: 0,
    days: 0
  });

  // Scroll progress bar
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = Math.min(scrollPx / winHeightPx, 1);
      setScrollProgress(scrolled);
    };
    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  // Animated counters
  useEffect(() => {
    const targetValues = {
      launches: 87,
      leads: 64,
      days: 9
    };
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounters({
        launches: Math.floor(targetValues.launches * progress),
        leads: Math.floor(targetValues.leads * progress),
        days: Math.floor(targetValues.days * progress)
      });
      if (step >= steps) {
        clearInterval(timer);
        setCounters(targetValues);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, []);

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    }, {
      threshold: 0.1
    });
    document.querySelectorAll(".scroll-reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast({
        variant: "destructive",
        title: "Campos requeridos",
        description: "Por favor completa tu nombre y email"
      });
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      setShowThankYou(true);
      toast({
        title: "¡Bienvenido!",
        description: "Tu eBook está siendo procesado..."
      });
    }, 500);

    // Ejemplo de uso en el submit del formulario
    crearLeadOdoo({
      nombre: formData.name,
      email: formData.email,
      telefono: formData.whatsapp,
      mensaje: "Lead Magnet - Primer capítulo solicitado"
    });
  };
  const copyUTM = (campaign: string) => {
    const utm = `https://tusitio.com/landing24x7?utm_source=landing&utm_medium=web&utm_campaign=${campaign}`;
    navigator.clipboard.writeText(utm);
    toast({
      title: "UTM Copiado",
      description: "El enlace ha sido copiado al portapapeles"
    });
  };

  const scrollToCompra = () => {
    document.getElementById('compra')?.scrollIntoView({ behavior: 'smooth' });
  };
  if (showThankYou) {
    return <ThankYouPage />;
  }
  return <div className="min-h-screen">
      {/* Progress Bar */}
      <div className="progress-bar" style={{
      width: `${scrollProgress * 100}%`
    }} />

      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-neon" />
            <span className="font-bold text-lg">Landing 24/7</span>
          </div>
          <Button className="btn-neon" onClick={scrollToCompra}>
            Obtener eBook
          </Button>
        </div>
      </nav>

      {/* Hero Section with VSL */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background opacity-90" />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div className="space-y-8">
              <Badge className="bg-primary/20 text-primary border-primary/30">
                🚀 Nuevo Método 2025
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Lanza una Landing Page que Genera{" "}
                <span className="text-neon">Clientes</span> en Menos de{" "}
                <span className="text-neon">24 Horas</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                El sistema paso a paso para emprendedores y marketers que quieren convertir visitantes en ventas, rápido — <strong className="text-foreground">sin escribir una sola línea de código</strong>.
              </p>
              
              <div className="glass-card p-6">
                <p className="text-lg font-semibold text-primary mb-2">
                  ⚡ Promesa Ganadora:
                </p>
                <p className="text-lg">
                  "Capta <strong>50–100 leads</strong> en 7–14 días con una landing hecha en <strong>5 minutos con IA</strong>, sin diseñadores."
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="btn-neon text-lg px-8 py-6" onClick={scrollToCompra}>
                  <Download className="w-5 h-5 mr-2" />
                  Obtener eBook Ahora - $9
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="btn-ghost-neon text-lg px-8 py-6"
                  onClick={scrollToCompra}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Ver Demo 60s
                </Button>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>+{counters.launches} lanzamientos</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span>{counters.leads} leads en {counters.days} días</span>
                </div>
              </div>
            </div>

            {/* Right: VSL & Visual */}
            <div className="space-y-6">
              {/* Hero Section with VSL (el video corto primero) */}
              <div className="glass-card p-1 animate-float">
                <div className="relative aspect-video w-full h-full rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/AFHPMIu86xU?autoplay=1&mute=1&controls=0&rel=0&showinfo=0&modestbranding=1"
                    title="Demo Corto"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="w-full h-full object-cover border-0 rounded-lg"
                    style={{ minHeight: 240 }}
                  />
                </div>
              </div>
              
              <div className="glass-card p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                  <span className="font-semibold">Demo: IA → Landing → Leads</span>
                </div>
                <div className="flex justify-center gap-2 text-sm">
                  <Badge variant="secondary">1. Prompt</Badge>
                  <ArrowRight className="w-4 h-4 text-primary" />
                  <Badge variant="secondary">2. Titular</Badge>
                  <ArrowRight className="w-4 h-4 text-primary" />
                  <Badge variant="secondary">3. Pegar</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Esto es para ti? */}
      <section className="py-20 section-tech">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center scroll-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              ¿Esto es para ti? ✅
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="glass-card p-6 text-left">
                <CheckCircle2 className="w-6 h-6 text-primary mb-4" />
                <p>Atraer leads y clientes de forma predecible</p>
              </div>
              <div className="glass-card p-6 text-left">
                <CheckCircle2 className="w-6 h-6 text-primary mb-4" />
                <p>Tener páginas simples que conviertan sin depender de diseñadores o agencias</p>
              </div>
              <div className="glass-card p-6 text-left">
                <CheckCircle2 className="w-6 h-6 text-primary mb-4" />
                <p>Escalar ventas digitales con una estrategia clara (no solo estética)</p>
              </div>
              <div className="glass-card p-6 text-left">
                <CheckCircle2 className="w-6 h-6 text-primary mb-4" />
                <p>Validar tu oferta rápido sin gastar en agencia</p>
              </div>
              <div className="glass-card p-6 text-left">
                <CheckCircle2 className="w-6 h-6 text-primary mb-4" />
                <p>Lanzar tu primera landing aunque tengas &lt;3k seguidores</p>
              </div>
              <div className="glass-card p-6 text-left">
                <CheckCircle2 className="w-6 h-6 text-primary mb-4" />
                <p>Aprender a medir lo que importa (CVR, CPL)</p>
              </div>
              <div className="glass-card p-6 text-left md:col-span-2">
                <CheckCircle2 className="w-6 h-6 text-primary mb-4" />
                <p>Construir un sistema que vende 24/7 mientras haces otras cosas</p>
              </div>
            </div>

            <Button size="lg" className="btn-neon" onClick={scrollToCompra}>
              <Target className="w-5 h-5 mr-2" />
              Quiero Empezar Hoy
            </Button>
          </div>
        </div>
      </section>

      {/* Frustración y Empatía */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center scroll-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-destructive">
              Sabemos lo que sientes... 😞
            </h2>
            
            <div className="space-y-6 mb-12">
              <div className="glass-card p-8 text-left">
                <h3 className="text-xl font-semibold mb-4 text-destructive">Frustración</h3>
                <p className="text-lg">Inviertes en ads y diseño, pero no ves resultados. Los clics no se convierten en leads reales.</p>
              </div>
              
              <div className="glass-card p-8 text-left">
                <h3 className="text-xl font-semibold mb-4 text-destructive">Inseguridad</h3>
                <p className="text-lg">No controlas tu proceso de ventas. Dependes de otros para algo tan crítico como generar clientes.</p>
              </div>
              
              <div className="glass-card p-8 text-left">
                <h3 className="text-xl font-semibold mb-4 text-destructive">Cansancio</h3>
                <p className="text-lg">"Intentas de todo" sin conversiones consistentes. Te sientes perdido en el mar de estrategias.</p>
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-4 text-primary">Pero hay una salida... ✨</h3>
              <p className="text-lg">
                Este eBook te dará la claridad y el método paso a paso que necesitas. 
                No más dudas, no más pérdida de tiempo. Solo un sistema probado que funciona.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Propuesta de Valor */}
      <section className="py-20 section-tech">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center scroll-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              Por qué es <span className="text-neon">diferente</span> 🚀
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="glass-card p-8 text-left">
                <h3 className="text-xl font-bold mb-4 text-primary">RUTA + IA + Optimización</h3>
                <p>No solo plantillas bonitas. Un método completo que combina psicología, IA y métricas reales.</p>
              </div>
              
              <div className="glass-card p-8 text-left">
                <h3 className="text-xl font-bold mb-4 text-primary">Sistema Probado</h3>
                <p>Basado en +87 lanzamientos reales y casos de éxito documentados.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 justify-center">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <span className="text-lg">Copy + estructura + IA en un solo método</span>
              </div>
              <div className="flex items-center gap-4 justify-center">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <span className="text-lg">Publica en 5 minutos, no 5 días</span>
              </div>
              <div className="flex items-center gap-4 justify-center">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <span className="text-lg">Mide y escala con datos reales</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios en Tabs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto scroll-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
              Tu <span className="text-neon">transformación</span> paso a paso
            </h2>
            
            <Tabs defaultValue="dolor" className="w-full">
              <TabsList className="grid w-full grid-cols-3 glass-card">
                <TabsTrigger value="dolor">😞 Dolor</TabsTrigger>
                <TabsTrigger value="resultado">✨ Resultado</TabsTrigger>
                <TabsTrigger value="ia">🤖 Con IA</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dolor" className="mt-8">
                <Card className="glass-card">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6 text-destructive">ANTES (Sin método)</h3>
                    <div className="space-y-4">
                      <p>❌ Gastas en ads sin conversiones claras</p>
                      <p>❌ Dependes de diseñadores caros y lentos</p>
                      <p>❌ No sabes qué palabras usar para vender</p>
                      <p>❌ Tu página no conecta con tu audiencia</p>
                      <p>❌ No puedes medir ni optimizar nada</p>
                      <p>❌ Pierdes leads porque tu proceso es confuso</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="resultado" className="mt-8">
                <Card className="glass-card">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6 text-primary">DESPUÉS (Con el método)</h3>
                    <div className="space-y-4">
                      <p>✅ Generas 50+ leads predecibles cada mes</p>
                      <p>✅ Creas landing pages en menos de 1 hora</p>
                      <p>✅ Escribes copy que realmente convierte</p>
                      <p>✅ Tu mensaje resuena con tu audiencia ideal</p>
                      <p>✅ Optimizas basado en datos reales</p>
                      <p>✅ Tu sistema vende 24/7 sin tu presencia</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="ia" className="mt-8">
                <Card className="glass-card">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6 text-accent">CON IA (El diferencial)</h3>
                    <div className="space-y-4">
                      <p>🤖 Prompts maestro para generar headlines perfectos</p>
                      <p>🤖 IA que escribe tu copy de ventas en minutos</p>
                      <p>🤖 Automatización de A/B testing inteligente</p>
                      <p>🤖 Análisis predictivo de conversiones</p>
                      <p>🤖 Optimización continua sin trabajo manual</p>
                      <p>🤖 Escalado automático de campañas exitosas</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Mini Demo */}
      <section className="py-20 section-tech">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center scroll-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              Así de <span className="text-neon">simple</span> es el proceso
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="glass-card p-8">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Escribe el Prompt</h3>
                <p>Usa nuestros prompts maestro para generar el copy perfecto en segundos</p>
              </div>
              
              <div className="glass-card p-8">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Genera & Plantilla</h3>
                <p>La IA crea tu estructura completa basada en landing que ya convierten</p>
              </div>
              
              <div className="glass-card p-8">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Publica Versiones</h3>
                <p>Lanza tu primera versión y configura tú para maximizar conversiones</p>
              </div>
            </div>

            {/* Mini Demo (el video largo abajo) */}
            <div id="demo-video" className="glass-card p-8">
              <h3 className="text-xl font-bold mb-4 text-primary">Demo en Vivo (60 segundos)</h3>
              <div className="relative aspect-video bg-card rounded-lg overflow-hidden border border-primary/30">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/KPAItDYGty8?autoplay=1&mute=1&controls=1&rel=0&showinfo=0&modestbranding=1"
                  title="VSL Demo"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="w-full h-full object-cover border-0 rounded-lg"
                  style={{ minHeight: 240 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entregables */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto scroll-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
              Qué recibes <span className="text-neon">exactamente</span> 📦
            </h2>
            
            <div className="glass-card p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6 text-primary">eBook Principal: "Landing que Vende 24/7"</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <p>📖 Capítulo 1: Método RUTA completo</p>
                  <p>📖 Capítulo 2: Promesa Ganadora (PG)</p>
                  <p>📖 Capítulo 3: HERO que convierte</p>
                  <p>📖 Capítulo 4: Integración con IA</p>
                </div>
                <div className="space-y-3">
                  <p>📖 Capítulo 5: Métricas y optimización</p>
                  <p>📖 Capítulo 6: A/B testing sistemático</p>
                  <p>📖 Capítulo 7: Escalado y automatización</p>
                  <p>📖 Anexos: Casos reales y plantillas</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-card p-6">
                <Gift className="w-12 h-12 text-primary mb-4" />
                <h4 className="text-xl font-bold mb-3">Biblioteca de Prompts</h4>
                <p>50+ prompts listos para usar en ChatGPT, Claude y Gemini</p>
              </div>
              
              <div className="glass-card p-6">
                <Shield className="w-12 h-12 text-primary mb-4" />
                <h4 className="text-xl font-bold mb-3">Plantillas Probadas</h4>
                <p>15 estructuras de landing que ya han generado +1000 leads</p>
              </div>
              
              <div className="glass-card p-6">
                <Rocket className="w-12 h-12 text-primary mb-4" />
                <h4 className="text-xl font-bold mb-3">Checklist de Lanzamiento</h4>
                <p>Lista paso a paso para que no olvides nada crítico</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bonos */}
      <section className="py-20 section-tech">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto scroll-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
              Bonos <span className="text-neon">exclusivos</span> 🎁
            </h2>
            
            <div className="space-y-6">
              <div className="glass-card p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Badge className="bg-primary text-primary-foreground">Bono #1</Badge>
                  <h3 className="text-xl font-bold">Prompts Maestro Pack</h3>
                </div>
                <ul className="space-y-2">
                  <li>• Prompts para crear landing en minutos</li>
                  <li>• Prompts para la Promesa Ganadora perfecta</li>
                  <li>• Prompts para construir tu propio eBook</li>
                  <li>• Prompts para guion de tu VSL</li>
                </ul>
              </div>
              
              <div className="glass-card p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Badge className="bg-primary text-primary-foreground">Bono #2</Badge>
                  <h3 className="text-xl font-bold">Plantillas de Diseño</h3>
                </div>
                <ul className="space-y-2">
                  <li>• Plantillas editables en Canva para diseñar tu eBook</li>
                  <li>• Plantilla de Mockups para promocionarlo</li>
                  <li>• 20+ banners para redes sociales</li>
                  <li>• Kit completo de branding</li>
                </ul>
              </div>
              
              <div className="glass-card p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Badge className="bg-primary text-primary-foreground">Bono #3</Badge>
                  <h3 className="text-xl font-bold">Swipe File de Copy</h3>
                </div>
                <ul className="space-y-2">
                  <li>• 100+ headlines probados para adaptar</li>
                  <li>• Subtítulos de alta conversión</li>
                  <li>• CTAs que realmente funcionan</li>
                  <li>• Emails de seguimiento automático</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comunidad */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center scroll-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              Únete a la <span className="text-neon">comunidad</span> 👥
            </h2>
            
            <div className="glass-card p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6 text-primary">Comunidad Privada de WhatsApp</h3>
              <p className="text-lg mb-6">
                Acceso exclusivo para dudas, feedback directo y networking con otros emprendedores 
                que están aplicando el método.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="font-semibold">Soporte Directo</p>
                </div>
                <div className="text-center">
                  <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="font-semibold">Casos de Éxito</p>
                </div>
                <div className="text-center">
                  <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="font-semibold">Feedback Personalizado</p>
                </div>
              </div>
              
              {/* Comunidad - Botón WhatsApp */}
              <Button size="lg" className="btn-neon" asChild>
                <a href="https://chat.whatsapp.com/Jm6VJEWgk1N5a1Hrsch2lv?mode=ems_copy_t" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Unirme al Grupo WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Conversaciones WhatsApp */}
      <section className="py-20 section-tech">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto scroll-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
              Lo que dicen en <span className="text-neon">WhatsApp</span> 💬
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              <div className="glass-card p-4">
                <img 
                  src={whatsapp01} 
                  alt="Conversación WhatsApp: María González - 73 leads en 2 semanas"
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                />
              </div>
              
              <div className="glass-card p-4">
                <img 
                  src={whatsapp02} 
                  alt="Conversación WhatsApp: Carlos Méndez - Primera landing y primer cliente"
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                />
              </div>
              
              <div className="glass-card p-4">
                <img 
                  src={whatsapp03} 
                  alt="Conversación WhatsApp: Ana Ruiz - Landing creada en una tarde"
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                />
              </div>
              
              <div className="glass-card p-4">
                <img 
                  src={whatsapp04} 
                  alt="Conversación WhatsApp: Roberto Silva - Conversión del 2% al 8%"
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historia/StorySelling */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto scroll-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
              Mi historia: De <span className="text-destructive">$0 en ventas</span> a <span className="text-neon">sistema automatizado</span>
            </h2>
            
            <div className="space-y-8">
              <div className="glass-card p-8">
                
                <h3 className="text-xl font-bold mb-4 text-destructive">La Caída (Marzo 2023)</h3>
                <p className="text-lg">
                  Después de gastar $3,000 USD en diseñadores y $5,000 en ads sin resultados, 
                  casi cerré el negocio. Mi página era "bonita" pero no vendía nada. 
                  Ahí entendí que el problema no era estético... era de conversión.
                </p>
              </div>
              
              <div className="glass-card p-8">
                <h3 className="text-xl font-bold mb-4 text-accent">La Epifanía (Mayo 2023)</h3>
                <p className="text-lg">
                  Descubrí que las landing que convertían tenían un patrón. No eran las más bonitas, 
                  sino las que conectaban con las emociones correctas en el orden correcto. 
                  Comencé a estudiar psicología de ventas + copywriting + UX.
                </p>
              </div>
              
              <div className="glass-card p-8">
                <h3 className="text-xl font-bold mb-4 text-primary">La Transformación (Julio 2023)</h3>
                <p className="text-lg">
                  Creé mi primer método RUTA y lo probé. Resultado: 67 leads en 12 días. 
                  Luego integré IA para acelerar el proceso. Ahora podía crear landing 
                  efectivas en minutos, no meses.
                </p>
              </div>
              
              <div className="glass-card p-8">
                <h3 className="text-xl font-bold mb-4 text-neon">La Solución (Hoy)</h3>
                <p className="text-lg">
                  Después de 87 lanzamientos y ayudar a +200 emprendedores, perfeccioné 
                  el sistema que ahora está en este eBook. No es teoría, son casos reales 
                  con resultados medibles. Tu atajo para evitar mis errores de $8,000.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 section-tech">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto scroll-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
              Preguntas <span className="text-neon">frecuentes</span> ❓
            </h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="tiempo" className="glass-card border-none px-6">
                <AccordionTrigger className="text-left">
                  ¿Cuánto tiempo me tomará crear mi primera landing?
                </AccordionTrigger>
                <AccordionContent>
                  Con los prompts y plantillas incluidos, puedes tener tu primera versión 
                  funcionando en 30-60 minutos. La optimización es continua, pero ya puedes 
                  empezar a captar leads desde el día 1.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="tecnica" className="glass-card border-none px-6">
                <AccordionTrigger className="text-left">
                  ¿Necesito conocimientos técnicos?
                </AccordionTrigger>
                <AccordionContent>
                  No. El método está pensado para emprendedores sin background técnico. 
                  Usamos herramientas no-code y todo está explicado paso a paso con capturas de pantalla.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="diseno" className="glass-card border-none px-6">
                <AccordionTrigger className="text-left">
                  ¿Qué pasa si no sé diseñar?
                </AccordionTrigger>
                <AccordionContent>
                  Perfecto, el método está diseñado precisamente para eso. Las plantillas ya tienen 
                  la estructura visual optimizada. Solo cambias textos y colores. Nada de diseño complejo.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="audiencia" className="glass-card border-none px-6">
                <AccordionTrigger className="text-left">
                  ¿Funciona si tengo pocos seguidores?
                </AccordionTrigger>
                <AccordionContent>
                  Sí, de hecho es ideal para empezar. El método se enfoca en conversión, no en volumen. 
                  Puedes generar leads de calidad aunque tengas menos de 1,000 seguidores.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="precio" className="glass-card border-none px-6">
                <AccordionTrigger className="text-left">
                  ¿Por qué solo $9? ¿Es información de calidad?
                </AccordionTrigger>
                <AccordionContent>
                  Es una estrategia de lanzamiento. Queremos que sea accesible para cualquier emprendedor. 
                  El contenido vale fácilmente $97+, pero preferimos volumen e impacto sobre márgenes altos.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="siguiente" className="glass-card border-none px-6">
                <AccordionTrigger className="text-left">
                  ¿Qué sigue después de comprar el eBook?
                </AccordionTrigger>
                <AccordionContent>
                  Recibes acceso inmediato al eBook + bonos. Te unirás al grupo de WhatsApp para 
                  soporte directo. En 30 días tendrás tu primera landing generando leads consistentes.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="soporte" className="glass-card border-none px-6">
                <AccordionTrigger className="text-left">
                  ¿Hay soporte o quedó solo con el PDF?
                </AccordionTrigger>
                <AccordionContent>
                  Incluye acceso al grupo privado de WhatsApp donde resuelvo dudas directamente. 
                  También email de soporte y actualizaciones gratuitas del contenido.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="resultados" className="glass-card border-none px-6">
                <AccordionTrigger className="text-left">
                  ¿Garantizan resultados específicos?
                </AccordionTrigger>
                <AccordionContent>
                  No prometemos números exactos porque depende de tu nicho y ejecución. 
                  Pero sí garantizamos que tendrás un método probado y el soporte necesario para aplicarlo correctamente.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Gatillos Mentales */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center scroll-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12">
              <span className="text-destructive">Últimas horas</span> para acceder 🔥
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="glass-card p-8 border-2 border-destructive/50">
                <Clock className="w-12 h-12 text-destructive mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4 text-destructive">Urgencia Real</h3>
                <p>Los bonos cierran en 48 horas. Después solo estará disponible el eBook básico por $27.</p>
              </div>
              
              <div className="glass-card p-8 border-2 border-primary/50">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4 text-primary">Escasez</h3>
                <p>Solo 100 plazas para la comunidad privada. Quedan 23 disponibles.</p>
              </div>
              
              <div className="glass-card p-8 border-2 border-accent/50">
                <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4 text-accent">Prueba Social</h3>
                <p>+87 lanzamientos exitosos y +200 emprendedores ya aplicando el método.</p>
              </div>
              
              <div className="glass-card p-8 border-2 border-secondary/50">
                <Star className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4 text-secondary">Pertenencia</h3>
                <p>Únete a la comunidad exclusiva de emprendedores que dominan landing pages con IA.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Botón de Compra */}
      <section id="compra" className="py-20 section-tech">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center scroll-reveal">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">
              Obtén <span className="text-neon">"Landing que Vende 24/7"</span>
            </h2>
            
            <div className="glass-card p-12 border-2 border-primary/50">
              <div className="mb-8">
                <div className="text-6xl font-bold text-neon mb-4">$9 USD</div>
                <p className="text-muted-foreground line-through text-xl">Valor real: $97</p>
                <p className="text-primary font-semibold">Precio de lanzamiento por tiempo limitado</p>
              </div>
              
              <div className="space-y-4 mb-8 text-left">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>eBook completo "Landing que Vende 24/7" (120+ páginas)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Biblioteca de 50+ prompts maestro para IA</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Plantillas editables en Canva + Mockups</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Swipe File con +100 headlines probados</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Acceso a comunidad privada de WhatsApp</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Soporte directo y actualizaciones gratuitas</span>
                </div>
              </div>
              
              <div className="mb-8">
                <p className="text-sm text-muted-foreground mb-4">Métodos de pago seguros:</p>
                <div className="flex justify-center gap-4">
                  <Badge variant="secondary">PayPal</Badge>
                  <Badge variant="secondary">Tarjetas</Badge>
                  <Badge variant="secondary">Mercado Pago</Badge>
                </div>
              </div>
              
              {/* Botón de compra con link externo */}
              <Button size="lg" className="btn-neon text-xl px-12 py-6 w-full mb-6" asChild>
                <a href="https://pay.hotmart.com/B101983985V?checkoutMode=10" target="_blank" rel="noopener noreferrer">
                  <Download className="w-6 h-6 mr-3" />
                  Obtener Acceso Inmediato - $9 USD
                </a>
              </Button>
              
              <p className="text-sm text-muted-foreground">
                ✅ Acceso inmediato • ✅ Descarga instantánea • ✅ Garantía 30 días
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* UTM Generator */}
      <section className="py-12 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">
              UTMs para tu campaña 🔗
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="flex items-center gap-2" onClick={() => copyUTM("dolor")}>
                <Copy className="w-4 h-4" />
                Dolor
              </Button>
              <Button variant="outline" className="flex items-center gap-2" onClick={() => copyUTM("resultado")}>
                <Copy className="w-4 h-4" />
                Resultado
              </Button>
              <Button variant="outline" className="flex items-center gap-2" onClick={() => copyUTM("ia")}>
                <Copy className="w-4 h-4" />
                IA
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario Lead Magnet */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center scroll-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              ¿Prefieres probarlo <span className="text-neon">gratis</span> primero? 🎯
            </h2>
            <div className="glass-card p-8">
              <p className="text-lg mb-8">
                Descarga los primeros 3 capítulos gratis + 10 prompts maestro. 
                Si te gusta, accedes al eBook completo con descuento exclusivo.
              </p>
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="sr-only">Nombre</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="Tu nombre completo" 
                      required 
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="sr-only">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="tu@email.com" 
                      required 
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="whatsapp" className="sr-only">WhatsApp (opcional)</Label>
                  <Input 
                    id="whatsapp" 
                    name="whatsapp" 
                    placeholder="WhatsApp (opcional para grupo VIP)" 
                    value={formData.whatsapp}
                    onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                  />
                </div>
                <Button type="submit" size="lg" className="btn-neon w-full">
                  <Download className="w-5 h-5 mr-2" />
                  Descargar Muestra Gratis
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Cierre Final */}
      <section className="py-20 section-tech">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center scroll-reveal">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">
              Tu momento de <span className="text-neon">decidir</span> 🚀
            </h2>
            
            <div className="space-y-8">
              <p className="text-xl leading-relaxed">
                Puedes seguir gastando en ads que no convierten, esperando que "algún día" 
                tengas una landing que realmente funcione...
              </p>
              
              <p className="text-xl leading-relaxed">
                <strong className="text-primary">O puedes invertir $9 hoy</strong> y tener en tus manos 
                el sistema exacto que ya usaron +200 emprendedores para generar miles de leads.
              </p>
              
              <div className="glass-card p-8 mb-8">
                <h3 className="text-2xl font-bold mb-4 text-primary">Garantía sin riesgos</h3>
                <p className="text-lg">
                  Si en 30 días no has creado tu primera landing o no ves el valor del contenido, 
                  te devolvemos el 100% de tu dinero. Sin preguntas.
                </p>
              </div>
              
              <Button size="lg" className="btn-neon text-xl px-12 py-6 animate-glow" onClick={scrollToCompra}>
                <Rocket className="w-6 h-6 mr-3" />
                Sí, Quiero Dominar las Landing Pages - $9
              </Button>
              
              <p className="text-sm text-muted-foreground">
                Bonos se cierran en 48 horas • Solo quedan 23 plazas para la comunidad
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Sticky Mobile */}
      <div className="cta-sticky">
        <Button className="btn-neon w-full py-4" onClick={scrollToCompra}>
          <Download className="w-5 h-5 mr-2" />
          Obtener eBook - $9
        </Button>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                <Zap className="w-6 h-6 text-neon" />
                <span className="font-bold text-lg">Landing 24/7</span>
              </div>
              <p className="text-muted-foreground">
                El sistema para crear landing pages que convierten con IA
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Soporte</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>contacto@tusitio.com</p>
                <Button variant="link" className="p-0 h-auto text-primary">
                  WhatsApp: Abrir chat
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <div className="space-y-2">
                <Button variant="link" className="p-0 h-auto text-muted-foreground">
                  Términos de uso
                </Button>
                <Button variant="link" className="p-0 h-auto text-muted-foreground">
                  Política de privacidad
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/50 pt-8 mt-8 text-center text-muted-foreground">
            <p>&copy; 2025 Landing que Vende 24/7. Todos los derechos reservados. Saulo Torres</p>
          </div>
        </div>
      </footer>
    </div>;
};

// Thank You Page Component
const ThankYouPage = () => {
  return <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-card p-12">
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              ¡Bienvenido a la <span className="text-neon">revolución</span> de las landing pages! 🚀
            </h1>
            
            <p className="text-xl mb-8 text-muted-foreground">
              Tu eBook está siendo procesado. En menos de 2 minutos recibirás:
            </p>
            
            <div className="space-y-4 mb-8 text-left">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>eBook "Landing que Vende 24/7" en tu email</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Acceso al grupo privado de WhatsApp</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Todos los bonos y plantillas</span>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg mb-8">
              <h3 className="text-2xl font-bold mb-4 text-primary">Video Exclusivo (90 segundos)</h3>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                <Play className="w-16 h-16 text-primary" />
              </div>
              <p className="text-muted-foreground">
                Cómo implementar tu primera landing page en los próximos 30 minutos
              </p>
            </div>
            
            <div className="space-y-4">
              <Button size="lg" className="btn-neon w-full" asChild>
                <a href="https://chat.whatsapp.com/Jm6VJEWgk1N5a1Hrsch2lv?mode=ems_copy_t" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Unirme al Grupo de WhatsApp
                </a>
              </Button>
              
              <div className="glass-card p-6">
                <h4 className="font-bold mb-4">Primeros pasos (haz esto hoy):</h4>
                <div className="space-y-2 text-left">
                  <p>✅ 1. Revisa tu email y descarga el eBook</p>
                  <p>✅ 2. Únete al grupo de WhatsApp</p>
                  <p>✅ 3. Ve el video de implementación</p>
                  <p>✅ 4. Elige tu primer prompt del Capítulo 4</p>
                  <p>✅ 5. Comparte tu progreso en el grupo</p>
                </div>
              </div>
              
              <div className="bg-destructive/20 border border-destructive/50 p-4 rounded-lg">
                <p className="text-destructive font-semibold">
                  ⏰ Recordatorio: Los bonos cierran en 47 horas. Si conoces a alguien que necesite esto, ¡compártele!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};

// Función para crear lead en Odoo
async function crearLeadOdoo({ nombre, email, telefono, mensaje }) {
  const url = "https://saulo-torres-marketing-and-bussines.odoo.com/jsonrpc";
  const db = "AQUÍ VA EL NOMBRE DE LA BASE DE DATOS"; // Reemplaza aquí
  const usuario = "rudastijera@gmail.com";
  const apiKey = "7ca63ebb775d4d69c2c5d125d209abd288313cde";

  // 1. Autenticación
  const authPayload = {
    jsonrpc: "2.0",
    method: "call",
    params: {
      db,
      login: usuario,
      password: apiKey
    },
    id: 1
  };

  let uid;
  try {
    const authRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...authPayload,
        method: "call",
        params: {
          service: "common",
          method: "login",
          args: [db, usuario, apiKey]
        }
      })
    });
    const authData = await authRes.json();
    uid = authData.result;
    if (!uid) throw new Error("No se pudo autenticar en Odoo");
  } catch (err) {
    alert("Error de autenticación Odoo: " + err.message);
    return;
  }

  // 2. Crear el lead
  const leadPayload = {
    jsonrpc: "2.0",
    method: "call",
    params: {
      service: "object",
      method: "execute_kw",
      args: [
        db,
        uid,
        apiKey,
        "crm.lead",
        "create",
        [{
          name: `Lead desde Landing: ${nombre}`,
          contact_name: nombre,
          email_from: email,
          phone: telefono,
          description: mensaje
        }]
      ]
    },
    id: 2
  };

  try {
    const leadRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadPayload)
    });
    const leadData = await leadRes.json();
    if (leadData.result) {
      alert("¡Lead creado exitosamente en Odoo!");
    } else {
      throw new Error("No se pudo crear el lead");
    }
  } catch (err) {
    alert("Error al crear el lead en Odoo: " + err.message);
  }
}
export default Index;