/**
 * Pure logic utilities for the Creative Developer / 3D Artist Portfolio
 * Used by unit tests and mirrored inside the standalone index.html
 */

export interface ProjectItem {
  id: string;
  title: string;
  category: '3d' | 'webgl' | 'motion';
  categoryLabel: string;
  year: string;
  client: string;
  role: string;
  fps: string;
  polygons: string;
  summary: string;
  description: string;
  architecture: string[];
  deliverables: string[];
  accent: string;
  shapeType: 'mechCore' | 'gyroMatrix' | 'crystalPylon' | 'orbitalDrone';
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'aether-core',
    title: 'Aether Core Reactor 3D',
    category: '3d',
    categoryLabel: '3D Art & Procedural Rig',
    year: '2026',
    client: 'Hyperion Spatial Labs',
    role: 'Lead 3D Artist & Technical Director',
    fps: '120 FPS',
    polygons: '48.4K Tris',
    summary: 'Многокомпонентное процедурное ядро реактора с магнитными кольцами, энергетическими пилонами и кинематическим приводом.',
    description: 'Разработка составного 3D-ассета из 9 геометрических узлов: центрального октаэдрического кристалла, трёх независимых карданных колец с фасками, шести охлаждающих пилонов и орбитальных спутников с PBR-материалами.',
    architecture: ['Custom BufferGeometry', 'Multi-Axis Gimbal Rig', 'Procedural Emissive Shaders', 'Zero-GC Matrix Updates'],
    deliverables: ['Интерактивный 3D-вьюпорт', 'Система карданного подвеса', 'Настраиваемые режимы вращения'],
    accent: '#00ff88',
    shapeType: 'mechCore'
  },
  {
    id: 'chronos-gyro',
    title: 'Chronos Gyroscope Engine',
    category: 'webgl',
    categoryLabel: 'WebGL & Shaders',
    year: '2026',
    client: 'Vortex Interactive',
    role: 'Creative WebGL Developer',
    fps: '144 FPS',
    polygons: '62.0K Tris',
    summary: 'Интерактивный пространственный гироскоп с реалтайм физикой частиц, волновым полем и динамическим преломлением света.',
    description: 'Гибридный WebGL-движок, объединяющий иерархическую 3D-сцену и реактивную нейросеть частиц. Включает плавное экспоненциальное демпфирование камеры и мгновенный отклик на курсор.',
    architecture: ['WebGL2 Pipeline', 'Spatial Hash Grid', 'Spring Physics Damping', 'Web Audio Synth Link'],
    deliverables: ['WebGL-симуляция в реальном времени', 'Адаптивный LOD-рендерер', 'Аудио-реактивный отклик'],
    accent: '#00e5ff',
    shapeType: 'gyroMatrix'
  },
  {
    id: 'kinetix-monolith',
    title: 'Kinetix Monolith Sculpture',
    category: 'motion',
    categoryLabel: 'Motion & Animation',
    year: '2025',
    client: 'NeoTokyo Media Arts',
    role: '3D Motion Designer',
    fps: '90 FPS',
    polygons: '36.8K Tris',
    summary: 'Кинетическая архитектурная скульптура с процедурной морфинг-анимацией сегментов и синхронизированным световым контуром.',
    description: 'Серия процедурных анимационных сцен для инсталляции. Каждый сегмент колонны вращается по гармоническим синусоидальным законам со сдвигом фазы и динамическим свечением граней.',
    architecture: ['Harmonic Phase Kinematics', 'Procedural Bevel Extrusion', 'Dynamic Rim Lighting', 'Timeline State Machine'],
    deliverables: ['Процедурная система анимации', 'Интерактивный превью-плеер', 'Экспорт ключевых поз'],
    accent: '#00ff88',
    shapeType: 'crystalPylon'
  },
  {
    id: 'valkyrie-drone',
    title: 'Valkyrie Orbital Probe',
    category: '3d',
    categoryLabel: '3D Art & Procedural Rig',
    year: '2025',
    category: '3d',
    client: 'Aegis Aerospace',
    role: 'Senior 3D Generalist',
    fps: '120 FPS',
    polygons: '54.2K Tris',
    summary: 'Орбитальный исследовательский зонд из 11 процедурных деталей с подвижными солнечными лепестками и сканирующим визором.',
    description: 'Детализированный 3D-концепт космического аппарата: бронированный корпус, 4 поворотных двигательных гондолы, параболическая антенна дальнего космоса и импульсный лазерный сканер.',
    architecture: ['11-Part Composite Assembly', 'Hard-Surface Procedural Mesh', 'Anisotropic Metal Shading', 'Interactive Exploded View'],
    deliverables: ['3D-модель с взрыв-схемой (Exploded View)', 'Интерактивный осмотр на 360°', 'Телеметрия узлов'],
    accent: '#00e5ff',
    shapeType: 'orbitalDrone'
  }
];

export function filterProjects(projects: ProjectItem[], category: string): ProjectItem[] {
  const normalized = category.trim().toLowerCase();
  if (!normalized || normalized === 'all') {
    return projects;
  }
  return projects.filter((p) => p.category.toLowerCase() === normalized);
}

const DECODER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>[]{}';

export function decodeTextStep(targetText: string, progress: number, seed = 42): string {
  const clamped = Math.max(0, Math.min(1, progress));
  const revealCount = Math.floor(clamped * targetText.length);
  let output = '';
  for (let i = 0; i < targetText.length; i++) {
    const ch = targetText[i];
    if (ch === ' ') {
      output += ' ';
    } else if (i < revealCount || clamped === 1) {
      output += ch;
    } else {
      const idx = (i * 17 + seed + Math.floor(clamped * 23)) % DECODER_CHARS.length;
      output += DECODER_CHARS[idx];
    }
  }
  return output;
}

export interface TerminalResult {
  action: 'output' | 'clear';
  lines: string[];
}

export function executeTerminalCommand(rawInput: string): TerminalResult {
  const cmd = rawInput.trim().toLowerCase();
  if (!cmd) {
    return { action: 'output', lines: ['Введите команду. Напишите "help" для списка доступных команд.'] };
  }

  switch (cmd) {
    case 'help':
      return {
        action: 'output',
        lines: [
          'Доступные команды интерактивного терминала AirLock:',
          '  help     — показать список всех доступных команд',
          '  about    — информация об AirLock (Creative Developer & 3D Artist)',
          '  skills   — ключевой стек технологий (3D, WebGL, Animation)',
          '  projects — список избранных 3D и WebGL проектов',
          '  3d       — управление главной 3D-сценой и геометриями',
          '  clear    — очистить историю консоли'
        ]
      };
    case 'about':
      return {
        action: 'output',
        lines: [
          'AirLock — Creative Developer, 3D Artist & Procedural Animator.',
          'Специализируюсь на создании высокопроизводительных WebGL/Three.js сцен,',
          'процедурной 3D-геометрии, шейдерных эффектов и нестандартных интерфейсов.'
        ]
      };
    case 'skills':
      return {
        action: 'output',
        lines: [
          'Стек технологий и инструментов AirLock:',
          '  • 3D & WebGL: Three.js, WebGL2, GLSL Shaders, Custom BufferGeometry (96%)',
          '  • 3D Art & Design: Blender, Houdini Procedural, Hard-Surface Modeling (94%)',
          '  • Creative Coding: Native JS/TS, HTML5 Canvas 2D/3D, Web Audio API (98%)',
          '  • Motion & Physics: GSAP / Spring Kinematics, Morph Targets, Inverse Kinematics (92%)'
        ]
      };
    case 'projects':
    case 'work':
      return {
        action: 'output',
        lines: PROJECTS.map(
          (p, i) => `  0${i + 1}. ${p.title} [${p.categoryLabel}] — ${p.polygons}, ${p.fps}`
        )
      };
    case '3d':
      return {
        action: 'output',
        lines: [
          'Активные 3D-системы на странице:',
          '  1. Hero 3D Assembly: 10-компонентное процедурное ядро (Core + Gimbal Rings + Orbital Nodes)',
          '  2. Interactive 3D Object Lab: переключение моделей, взрыв-схема (Exploded View) и каркас',
          '  3. 3D Card Previews: индивидуальный 3D-рендер для каждого из 4 проектов'
        ]
      };
    case 'clear':
      return { action: 'clear', lines: [] };
    default:
      return {
        action: 'output',
        lines: [
          `Команда "${rawInput.trim()}" не распознана.`,
          'Введите "help", чтобы увидеть список доступных команд (help, about, skills, projects, 3d, clear).'
        ]
      };
  }
}

export interface ContactFormInput {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: {
    name?: string;
    email?: string;
    message?: string;
  };
}

export function validateContactForm(input: ContactFormInput): ValidationResult {
  const errors: ValidationResult['errors'] = {};
  const name = (input.name || '').trim();
  const email = (input.email || '').trim();
  const message = (input.message || '').trim();

  if (name.length < 2) {
    errors.name = 'Введите ваше имя (минимум 2 символа).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.email = 'Введите корректный адрес электронной почты.';
  }

  if (message.length < 10) {
    errors.message = 'Опишите задачу чуть подробнее (минимум 10 символов).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export function calculateTiltAngles(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number },
  maxTiltDeg = 12
): { rotateX: number; rotateY: number; glareX: number; glareY: number } {
  const width = Math.max(1, rect.width);
  const height = Math.max(1, rect.height);
  const relX = Math.max(0, Math.min(1, (clientX - rect.left) / width));
  const relY = Math.max(0, Math.min(1, (clientY - rect.top) / height));

  const rotateY = (relX - 0.5) * 2 * maxTiltDeg;
  const rotateX = (0.5 - relY) * 2 * maxTiltDeg;

  return {
    rotateX: Number(rotateX.toFixed(2)),
    rotateY: Number(rotateY.toFixed(2)),
    glareX: Math.round(relX * 100),
    glareY: Math.round(relY * 100)
  };
}
