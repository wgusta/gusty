'use client';

import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import ProjectCard from '@/components/ProjectCard';
import DangerCard from '@/components/DangerCard';
import ProjectModal from '@/components/ProjectModal';
import { RichContent, VideoEmbed, CodeSnippet } from '@/components/ProjectModal';
import ATSProjectContent from '@/components/ATSProjectContent';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  column: 'design' | 'ai' | 'bridged' | 'danger';
  finalizedAt: string; // ISO date string
  designContent?: React.ReactNode | string;
  aiContent?: React.ReactNode | string;
  status?: 'live' | 'development' | 'archived';
  liveUrl?: string;
  downloadUrl?: string;
  techStack?: { [category: string]: string[] };
}

// Project data
const projects: Project[] = [
  // BadenLEG Platform - Bridged Project
  {
    id: 'badenleg',
    title: 'Matchmaking-Plattform for Local Energy Communities (LEG)',
    description: 'Matchmaking for local energy communities - A web platform that helps homeowners in Baden (Switzerland) find neighbors to form Local Electricity Communities (LEG) starting in 2026.',
    tags: ['Flask', 'SendGrid', 'TailwindCSS', 'Leaflet.js', 'Vanilla JavaScript', 'Railway', 'GitHub Actions', 'Gunicorn'],
    column: 'bridged',
    finalizedAt: '2024-11-14',
    status: 'live',
    liveUrl: 'https://badenleg.ch',
    designContent: `## Human-Made

### Concept & Architecture

**Product Concept and User Flow**

BadenLEG connects homeowners who want to share solar energy together. Users enter their address, the system finds suitable neighbors nearby and enables direct contact, all with a focus on privacy and anonymity.

**System Architecture**

- Flask app with clear API structure
- In-memory database for MVP
- Multi-layer security approach
- GDPR-compliant privacy design

**Security Concept**

- Input Validation & Sanitization (bleach)
- Rate Limiting (Flask-Limiter)
- Security Headers (CSP, HSTS, X-Frame-Options)
- Token-based email verification
- Coordinate anonymization (120m radius)

### Design & UX

**UI/UX Design**

- TailwindCSS for fast, consistent styling
- Mobile-first responsive layout
- Interactive map integration with Leaflet.js
- Typography & branding in Baden city colors

**Core Features**

- Address-based matching with ML clustering
- Interactive map with anonymized locations (120m jitter)
- Automatic email notifications for new interested parties
- Educational content about LEG, EVL/vEVL and ZEV/vZEV
- GDPR-compliant with one-click unsubscribe

### Development

**Code Architecture**

- Clear structure and modularization
- API endpoint design
- Email templates and logic
- Error handling & logging

**Deployment**

- Railway setup & configuration
- GitHub Actions workflow for CI/CD
- DNS configuration (Infomaniak)
- SendGrid domain authentication

---

## Challenges

### Email Delivery Optimization

**Challenge:** Emails from badenleg.ch were blocked.

**Solution:** Configured SendGrid domain authentication with SPF, DKIM, DMARC records for reliable email delivery.

### Mobile User Experience

**Challenge:** Map overlapped with input fields.

**Solution:** Optimized mobile layout by hiding map on mobile devices, implementing full-screen input panel and centered logo for better usability.`,
    aiContent: `## AI-Assisted Development

### Code Generation

**Flask Endpoints and API Logic**

AI assistance in developing Flask endpoints and API logic for fast iteration and consistent patterns.

**Frontend JavaScript**

- Address autocomplete functionality
- Map integration with Leaflet.js
- Vanilla JavaScript without frameworks for direct DOM manipulation

**Security Utilities**

- Input validation implementation (bleach)
- Sanitization functions
- Email functions (SendGrid integration)

### Optimizations

**Performance Optimizations**

- Caching strategies for repeated requests
- Async tasks for background processing (email sending)
- Code refactoring and modularization

**Bug Fixes**

- Token persistence on Railway
- Duplicate detection in registrations
- Timeout issues with external API calls

### Documentation

- README.md and deployment guides
- SEO content (meta tags, structured data)
- Privacy policy & legal notice

### Debugging

- Error analysis (timeout problems, token issues)
- Log analysis and troubleshooting
- Performance profiling

---

## ML Functions

### DBSCAN Clustering

Groups buildings by geographic proximity (150m radius) and uses Haversine distance for earth curvature. Identifies optimal community formation with minimum size of 2-3 buildings per cluster.

### Autarky Simulation

Generates 15-minute time series profiles for consumption and PV production, simulates seasonal variations (summer/winter) and calculates autarky score for optimal match quality.

### Ranking

Clusters are sorted by autarky score - highest autarky = best match quality. Results are visualized in real-time on the map.

---

## Challenges

### Persistent Token Management

**Challenge:** Railway deletes the filesystem on every deployment. Tokens in separate JSON files were lost.

**Solution:** Store tokens directly in main database records for reliable persistence.

\`\`\`python
def issue_verification_token(building_id):
    """Creates a verification token and stores it in the DB record."""
    token = str(uuid.uuid4())
    
    # Invalidate old tokens for this building_id
    tokens_to_remove = [
        t for t, info in DB_VERIFICATION_TOKENS.items()
        if info.get('building_id') == building_id
    ]
    for t in tokens_to_remove:
        DB_VERIFICATION_TOKENS.pop(t, None)
    
    # Store token in main database record (persistent!)
    with db_lock:
        record, source = _get_record_for_building_no_lock(building_id)
        if record:
            record['verification_token'] = token  # Directly in record
            if source == 'registered':
                DB_BUILDINGS[building_id] = record
            elif source == 'anonymous':
                DB_INTEREST_POOL[building_id] = record
    
    DB_VERIFICATION_TOKENS[token] = {
        'building_id': building_id,
        'created_at': time.time()
    }
    return token
\`\`\`

### Fast Response Endpoint

**Challenge:** After address input, timeouts occurred due to slow external API calls and intensive ML calculations.

**Solution:** Implemented fast endpoint with pre-fetched coordinates, background threading and deterministic mock data for instant responses.

\`\`\`python
@app.route("/api/check_potential_fast", methods=['POST'])
def api_check_potential_fast():
    """Ultra-fast endpoint: Uses pre-fetched coordinates, no external APIs."""
    if not request.json:
        return jsonify({"error": "No data."}), 400
    
    # Directly from autocomplete suggestion (already geocoded!)
    lat = request.json.get('lat')
    lon = request.json.get('lon')
    
    if not lat or not lon:
        return jsonify({"error": "Coordinates missing."}), 400
    
    # Generate deterministic profile (no external API calls!)
    profile = generate_quick_profile(lat, lon, address_string)
    
    # Fast distance search (no autarky calculation)
    provisional_matches = find_provisional_matches_fast(profile)
    
    # Email sending in background thread (does not block!)
    if provisional_matches:
        threading.Thread(
            target=send_confirmation_email,
            args=(email, unsubscribe_url),
            daemon=True
        ).start()
    
    return jsonify({"match": provisional_matches})
\`\`\``
  },
  // User Story Map - AI-Assisted Project
  {
    id: 'user-story-map',
    title: 'User Story Map Tool',
    description: 'A standalone HTML tool for creating and managing User Story Maps in workshops. Built with vanilla JavaScript, no external dependencies.',
    tags: ['HTML', 'CSS', 'Vanilla JavaScript', 'localStorage', 'CSV Export'],
    column: 'ai',
    finalizedAt: '2024-12-01',
    downloadUrl: '/workshop-map11.html',
    aiContent: `## Overview

The process began with the idea of building one HTML tool that combined a Customer Journey Map and a User Story Map. It seemed efficient, but it introduced complexity very early. Two different conceptual models inside one file created maintenance issues, made debugging harder and slowed down iteration.

## How the Work Happened

### Initial build

The first version placed both maps in a single HTML document with shared data structures and shared export and import functions. At this stage the separation between the two tools was loose and grew tangled as more features were added.

### Shift in scope

During the iterations it became clear that the Customer Journey part did not add real value for the intended workshop workflow. The scope shifted toward focusing entirely on the User Story Map. This decision simplified the purpose but required removing many interconnected parts. Because both maps had shared logic, deleting the Customer Journey elements revealed hidden dependencies that affected data handling.

### Refactoring on a moving target

The Customer Journey components were removed, the UI was simplified and the export and import logic was reconnected to work exclusively with the User Story Map. Several remnants from the previous structure remained, including naming conventions and selectors that still pointed to the old model, which caused imported data to land in incorrect positions.

### Usability refinements

After the structural cleanup, the tool received refinements such as direct editing after double clicking, automatic text selection, safe deletion prompts for rows and columns and a fresh title field for project naming. These refinements required additional internal adjustments.

## Where the Process Got Messy

### No fixed data model at the beginning

A clear definition of rows, columns, cards and the corresponding CSV or JSON schema was never locked down at the start. Without a stable contract, the import and export system remained fragile and prone to unexpected behavior.

### Scope changes caused structural stress

Switching from a combined tool to a pure User Story Map meant removing code that was deeply interlinked with the original logic. This triggered cascading adjustments.

### Export and import validated too late

Most early attention went to the interface rather than the data pipeline. When export and import were finally tested in a realistic scenario, the issues surfaced late and required larger rewrites.

## What Still Worked Well

### Testing with real data

Using real CSV files exposed flaws early enough to avoid major issues at the end of the development cycle.

### Precise feedback loops

The process benefited from clear and unambiguous observations about what worked and what did not, which accelerated iteration.

### Scope reduction improved clarity

Removing the Customer Journey Map sharpened the focus and allowed a cleaner, more maintainable structure.

## How to Handle This Better Next Time

### Define the data model before coding

A JSON example and CSV schema should be created first. Each row, column and card needs explicit fields. This serves as a stable contract that guides all logic.

### Start with a tiny MVP

Only the User Story Map. Rows, columns, cards and export and import. Nothing more.

### Introduce usability later

After the data model is stable, editing behavior, styling and safety confirmations can be layered on top.

### Separate logic from interface

Data handling functions and UI rendering should be clearly separated. This prevents structural changes from affecting the entire codebase.

---

**Download the tool:** [workshop-map11.html](/workshop-map11.html) - A standalone HTML file that works offline, saves to localStorage, and exports to CSV. You can download it and use it directly in your browser without any setup.

The tool is available for download above and can be used immediately in any modern browser. Download the HTML file to get started with your User Story Map workshops.

**Get the tool:** The complete User Story Map tool is ready for download. Simply click the download button above or use this link: [workshop-map11.html](/workshop-map11.html). The file works completely offline and requires no installation or external dependencies.

**Ready to use:** Download the HTML file and open it in any modern browser to start creating User Story Maps in your workshops. All data is saved locally in your browser's localStorage, and you can export your maps to CSV format at any time.`
  },
  // ATS Templates - AI-Assisted Project
  {
    id: 'ats-templates',
    title: 'CV and Cover Letter Templates for ATS Survival',
    description: 'HTML templates designed to pass AI-based filters and ATS parsers while maintaining visual appeal for human reviewers. Built with semantic HTML and CSS print stylesheets.',
    tags: ['HTML', 'CSS', 'Print Stylesheets', 'Google Fonts', 'ATS-Optimized'],
    column: 'ai',
    finalizedAt: '2024-12-03',
    aiContent: <ATSProjectContent />,
  },
  // Design Projects (6)
  {
    id: 'penpot-design-system',
    title: 'Design System Freedom: Hand-Built in Penpot',
    description: 'A complete, hand-crafted design system built from scratch in Penpot—breaking free from corporate templates and CMS constraints.',
    tags: ['Design System', 'Penpot', 'Tokens', 'Components', 'Open Source'],
    column: 'design',
    finalizedAt: '2024-12-01',
    designContent: `## Motivation

In most of my previous work, I was tied to strict corporate design guidelines or limited by CMS templates. I could rarely test visual ideas freely or build components the way I wanted.

I wanted the opposite:

A design system that I control, that I can reuse across multiple projects, and where I can visually test components without restrictions.

I also wanted a real open-source alternative to Figma. In practice, there is only one option mature enough for daily work: Penpot.

So I built my own system directly in Penpot, completely by hand.

## What I Actually Did

### 1. Built a Complete Token Foundation

I set up all core tokens from scratch:

**Color tokens:** brand, neutrals, utilities

**Typography tokens:** headings, body, caption

**Spacing tokens:** 4 and 8-point scale

**Radius tokens:** three consistent corner styles

**Shadow tokens:** four levels

**Icon size tokens:** XS to XL

I grouped everything using clear naming so it's stable and scalable.

### 2. Structured Everything into Sets and Themes

I created:

**Sets** (Colors, Radius, Shadows, Typography, Spacing)

**Themes** that switch the entire system's visual tone

**Examples:**

- Bento Theme (rounded radii, soft shadows)
- Neutral Theme (clean, classic system look)
- Bold Theme (stronger contrast, harder edges)

All built manually, no imported UI kits.

### 3. Created Core Components by Hand

I designed every component from scratch, including alignment, constraints, and variants.

**Layout Components**

- Frame grids
- Card
- Card grid
- Section header
- Navigation
- Tabs (3 variants)
- Accordion
- Basic header
- Mobile navigation (bottom bar and drawer)

**Forms**

- Input field
- Textarea
- Select field
- Form row (label + input)

**UI Elements**

- Buttons (primary, secondary, ghost)
- Badges
- Status chips
- Info banner
- Event banner

Each component includes:

- precise spacing
- consistent radii and shadows
- state variants (default, hover, disabled)

### 4. Defined an Icon Baseline

To keep icons coherent, I established:

- 2px stroke
- rounded caps and corners
- 24x24 artboard
- consistent internal padding

### 5. Documented Everything Inside the Penpot File

I added a small internal documentation section explaining:

- spacing logic
- radius use cases
- color mapping
- how to extend components
- how to apply themes

Clear and functional, not over-engineered.

### 6. Tested the System in Real Mock Screens

To validate the foundations, I created quick test layouts:

- hero section
- card grid
- basic form page
- navigation bar

This helped me check:

- consistency between themes
- readability
- spacing rhythm
- whether components behave correctly

## In Summary

I built a fully hand-crafted design system in Penpot:

- custom tokens
- multiple themes
- a clean component library
- internal documentation
- tested with real layouts

100% created manually, without plugins, generators, or imported kits

It's now a reusable base for future work and a way to experiment visually without being limited by CMS structures or corporate design rules.`
  },
  // Danger Zone Projects
  // Linux Cachy OS Installation - Danger Zone Project
  {
    id: 'linux-cachy-install',
    title: 'Look Mama, no hands! Linux Installation on my Desktop PC',
    description: 'After running out of Windows 10 I was forced to upgrade to Windows 11, but it looked horrible. So I deleted everything, changed my CPU and installed Linux Cachy OS.',
    tags: ['Linux', 'Arch', 'Cachy OS', 'Installation', 'Hardware'],
    column: 'danger',
    finalizedAt: '2025-01-27',
    aiContent: `# Linux Cachy OS Installation

Windows 10 support ended. Microsoft pushed Windows 11. I had no choice.

I upgraded.

IT LOOKED HORRIBLE.

The interface felt wrong. The taskbar placement. The rounded corners everywhere. The way it handled windows. Everything felt like it was designed by someone who had never used a computer before.

I stared at my screen for days, trying to make it work. Trying to make it feel right.

IT NEVER DID.

So I made a decision.

I DELETED EVERYTHING.

![PC case with CPU upgrade](/images/linux-install-1.jpg)

First, I opened the case. Changed the CPU. Upgraded the hardware while I was at it. If I was going to start fresh, I might as well do it properly.

The old CPU came out. The new one went in. Thermal paste. Screws. Everything back in place.

HARDWARE READY. SOFTWARE NEXT.

I booted from a USB drive. The GRUB menu appeared.

![GRUB boot menu](/images/linux-install-2.jpg)

Welcome to GRUB. Version 2.06.

I selected the installation option. Pressed enter.

The screen went dark. Then came back with an error.

![Boot error message](/images/linux-install-3.jpg)

"error: loader/efi/linux.c:grub_arch_efi_linux_boot_image:227:cannot load image."

I stared at the error message.

THIS WAS NOT GOING TO BE EASY.

I pressed any key. Tried again. Same error.

I dropped to the GRUB command line.

![GRUB command line](/images/linux-install-4.jpg)

The command line appeared. I could see the kernel parameters. The boot configuration. Everything laid out in text.

I adjusted parameters. Added flags. Tried different kernel options.

cow_spacesize=10G copytoram=auto module_blacklist=pcspkr i915.modeset=1 amdgpu.modeset=1 nvme_load=yes

I typed. Adjusted. Booted again.

IT WORKED.

The Arch installation process started.

![Arch Linux boot process](/images/linux-install-5.jpg)

The screen filled with system messages. Kernel loading. Module initialization. Filesystem mounting.

:: running early hook [udev]
Starting systemd-udevd version 258.2-2-arch
:: running hook [archiso_loop_mnt]
:: Mounting '/dev/sdb1' to '/run/archiso/bootmnt'
:: Device /dev/sdb1 mounted successfully.
:: Copying rootfs image to RAM...

The progress bar filled. 703MiB copied. Installation proceeding.

I watched the terminal scroll. Line after line of system initialization. Everything working. Everything making sense.

NO ROUNDED CORNERS. NO FORCED UPDATES. NO TELEMETRY.

Just Linux. Just Arch. Just control.

The installation completed. I rebooted. The system came up.

Time to configure.

![Bluetooth terminal](/images/linux-install-6.jpg)

I opened a terminal. Started configuring Bluetooth. Pairing devices. Setting up the system.

bluetoothctl commands. Device discovery. Trusting devices. Connecting.

The terminal filled with [CHG] and [NEW] messages. Devices appearing. Devices connecting.

FF:87:8A:06:6D:EC MX Master 2S

The mouse connected. The keyboard connected. Everything working.

I kept configuring. Setting up the desktop environment. Installing packages. Making it mine.

![Getting started GUI](/images/linux-install-7.jpg)

The "Getting started" window appeared. A checklist of components. Authentication agent. Terminal. Wallpaper. Notification daemon. Application launcher.

Some items showed "Missing" in red. Others showed "Installed" in green. Some showed "Running" in blue.

I worked through the list. Installed what was needed. Configured what was required.

The system took shape. Component by component. Feature by feature.

I HAD CONTROL AGAIN.

No forced updates. No telemetry. No interface decisions made by someone else.

Just my system. Just my choices. Just Linux.

Windows 11 looked horrible. So I deleted everything. Changed my CPU. Installed Linux Cachy OS.

BEST DECISION I EVER MADE.`
  },
];

export default function Home() {
  // Check if danger zone should be shown (default: false in production)
  const showDangerZone = process.env.NEXT_PUBLIC_SHOW_DANGER_ZONE === 'true';

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [dangerZoneConfirmed, setDangerZoneConfirmed] = useState<boolean | null>(null);
  const [showDangerZoneMessage, setShowDangerZoneMessage] = useState(false);
  const [isDangerZoneInView, setIsDangerZoneInView] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'design' | 'ai' | 'bridged' | null>(null);
  const dangerZoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only initialize danger zone logic if enabled
    if (!showDangerZone) return;
    
    // Check localStorage for danger zone confirmation
    const savedConfirmation = localStorage.getItem('dangerZoneConfirmed');
    if (savedConfirmation === 'true') {
      setDangerZoneConfirmed(true);
    } else if (savedConfirmation === 'false') {
      setDangerZoneConfirmed(false);
      setShowDangerZoneMessage(true);
    } else {
      setDangerZoneConfirmed(null); // Show modal
    }
  }, [showDangerZone]);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const updateCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over interactive element
      const target = e.target as HTMLElement;
      const isInteractive = target.matches('a, button, [role="button"], [data-interactive]') ||
        target.closest('a, button, [role="button"], [data-interactive]');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', updateCursor);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
    };
  }, []);

  // Intersection Observer to detect when danger zone is in view
  useEffect(() => {
    if (!showDangerZone || !dangerZoneRef.current || dangerZoneConfirmed !== null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsDangerZoneInView(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
      }
    );

    observer.observe(dangerZoneRef.current);

    return () => {
      observer.disconnect();
    };
  }, [dangerZoneConfirmed]);

  const handleDangerZoneConfirm = () => {
    setDangerZoneConfirmed(true);
    localStorage.setItem('dangerZoneConfirmed', 'true');
  };

  const handleDangerZoneDecline = () => {
    setDangerZoneConfirmed(false);
    setShowDangerZoneMessage(true);
    localStorage.setItem('dangerZoneConfirmed', 'false');
  };

  // Filter and sort projects (exclude danger zone if disabled)
  const nonDangerProjects = projects.filter(p => p.column !== 'danger' || showDangerZone);
  const sortedProjects = [...nonDangerProjects].sort((a, b) => 
    new Date(b.finalizedAt).getTime() - new Date(a.finalizedAt).getTime()
  );
  
  // Filter projects based on active filter (mobile only)
  const filteredProjects = activeFilter === null
    ? [] 
    : sortedProjects.filter(p => p.column === activeFilter);
  
  // Sort danger zone projects by finalization date (newest first) - only if enabled
  const dangerProjects = showDangerZone ? projects.filter(p => p.column === 'danger') : [];
  const sortedDangerProjects = [...dangerProjects].sort((a, b) => 
    new Date(b.finalizedAt).getTime() - new Date(a.finalizedAt).getTime()
  );

  return (
    <main id="main-content" className="min-h-screen relative" tabIndex={-1}>
      {/* Custom Cursor - Hidden on touch devices */}
      <div
        className={`custom-cursor hidden md:block ${isHovering ? 'hover' : ''}`}
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
      />

      {/* Header */}
      <Header />

      {/* Split Screen Layout */}
      <div className={`min-h-screen pt-0 md:pt-8 lg:pt-10 xl:pt-12 relative ${activeFilter === null ? 'pb-4 md:pb-20' : 'pb-20'}`}>
        {/* Mobile Navigation - Only visible on mobile, hidden when modal is open */}
        {selectedProject === null && (
        <div className={`block md:hidden relative z-[60] w-full bg-off-white/95 backdrop-blur-sm md:my-0 ${activeFilter === null ? 'mb-2' : 'mb-[30px]'} mt-24`}>
          <div className="px-4 py-4">
            <h3 className="text-base font-terminal text-brand-black mb-6 uppercase tracking-wide">Explore projects</h3>
            {/* Tabs */}
            <div className="flex border-b border-brand-black/10">
              <button
                onClick={() => setActiveFilter(activeFilter === 'design' ? null : 'design')}
                className={`flex-1 px-4 py-3 text-center font-terminal text-sm transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-pink ${
                  activeFilter === 'design'
                    ? 'bg-deep-pink text-brand-white'
                    : 'bg-off-white text-brand-black hover:bg-deep-pink/10 active:bg-deep-pink/20'
                }`}
                aria-pressed={activeFilter === 'design'}
                aria-label="Filter human-made projects"
                data-interactive
              >
                human-made
              </button>
              <button
                onClick={() => setActiveFilter(activeFilter === 'ai' ? null : 'ai')}
                className={`flex-1 px-4 py-3 text-center font-terminal text-sm transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal ${
                  activeFilter === 'ai'
                    ? 'bg-teal text-brand-white'
                    : 'bg-off-white text-brand-black hover:bg-teal/10 active:bg-teal/20'
                }`}
                aria-pressed={activeFilter === 'ai'}
                aria-label="Filter AI-assisted projects"
                data-interactive
              >
                AI-assisted
              </button>
              <button
                onClick={() => setActiveFilter(activeFilter === 'bridged' ? null : 'bridged')}
                className={`flex-1 px-4 py-3 text-center font-terminal text-sm transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-pink ${
                  activeFilter === 'bridged'
                    ? 'bg-gradient-to-r from-deep-pink to-teal text-brand-white'
                    : 'bg-off-white text-brand-black hover:bg-gradient-to-r hover:from-deep-pink/10 hover:to-teal/10 active:bg-gradient-to-r active:from-deep-pink/20 active:to-teal/20'
                }`}
                aria-pressed={activeFilter === 'bridged'}
                aria-label="Filter teamed-up projects"
                data-interactive
              >
                teamed-up
              </button>
            </div>
          </div>
        </div>
        )}

        {/* Full-height background columns - Hidden on mobile, show off-white instead */}
        <div className="hidden md:grid absolute inset-0 top-32 md:top-32 lg:top-40 xl:top-48 bottom-0 grid-cols-1 md:grid-cols-2 pointer-events-none z-0">
          <div className="bg-deep-pink"></div>
          <div className="bg-teal"></div>
        </div>
        {/* Mobile background - off-white */}
        <div className="md:hidden absolute inset-0 top-80 bottom-0 bg-off-white pointer-events-none z-0"></div>
        
        {/* Project content - sorted by finalization date */}
        <div className="relative z-10 flex flex-col gap-0">
          {/* Section Titles at the top */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-0 mb-6 md:mb-8 relative z-20 w-full pt-32 md:pt-32 lg:pt-40 xl:pt-48">
            <div className="px-6 md:px-8 lg:px-12 relative z-20 block">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-white font-terminal mb-4 md:mb-6 lg:mb-8 px-2 md:px-4 relative z-20 block">
                human-made
              </h2>
            </div>
            <div className="px-6 md:px-8 lg:px-12 md:pl-0 relative z-20 block md:flex md:justify-end">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-white font-terminal mb-4 md:mb-6 lg:mb-8 px-2 md:px-4 md:pr-8 lg:pr-12 xl:pr-16 relative z-20 block">
                AI-assisted
              </h2>
            </div>
          </div>
          
          {/* Projects list */}
          {/* On mobile: only show when a button is clicked. On desktop: always show all */}
          <div className={activeFilter === null ? 'hidden md:block' : 'block'}>
            {(activeFilter === null ? sortedProjects : filteredProjects).length > 0 ? (
              (activeFilter === null ? sortedProjects : filteredProjects).map((project) => {
              if (project.column === 'bridged') {
                // Bridged project - full width
                return (
                  <div key={project.id} className="w-full px-6 md:px-8 lg:px-12 py-6 md:py-8 lg:py-10">
                    {/* Card - same background as other cards on desktop, gradient only on mobile */}
                    <div className="max-w-7xl mx-auto">
                      <ProjectCard
                        project={project}
                        onClick={() => setSelectedProject(project)}
                        activeFilter={activeFilter}
                      />
                    </div>
                  </div>
                );
              } else if (project.column === 'design') {
                // Design project - left column
                return (
                  <div 
                    key={project.id} 
                    className="w-full md:w-1/2 p-6 md:p-8 lg:p-12 md:mr-auto"
                  >
                    <ProjectCard
                      project={project}
                      onClick={() => setSelectedProject(project)}
                    />
                  </div>
                );
              } else {
                // AI project - right column
                return (
                  <div 
                    key={project.id} 
                    className="w-full md:w-1/2 p-6 md:p-8 lg:p-12 md:ml-auto"
                  >
                    <ProjectCard
                      project={project}
                      onClick={() => setSelectedProject(project)}
                    />
                  </div>
                );
              }
            })
          ) : (
            // Show empty state messages if no projects
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="p-6 md:p-8 lg:p-12">
                <p className="text-brand-white/80 font-terminal">No projects found.</p>
              </div>
              <div className="p-6 md:p-8 lg:p-12">
                <p className="text-brand-white/80 font-terminal">No projects found.</p>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Danger Zone Section - Always visible, blurred when not confirmed */}
      {showDangerZone && sortedDangerProjects.length > 0 && !showDangerZoneMessage && (
        <div 
          ref={dangerZoneRef}
          className="w-full bg-sun-red pt-4 pb-12 md:py-16 lg:py-20 relative"
        >
          {/* Content - blurred when not confirmed */}
          <div className={`max-w-7xl mx-auto px-6 md:px-8 lg:px-12 ${dangerZoneConfirmed !== true ? 'blur-md' : ''}`}>
            {/* Danger Zone Title */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-white font-erratic mb-4 md:mb-6">
                DANGER ZONE
              </h2>
            </div>
            
            {/* Danger Zone Projects */}
            <div className="flex flex-col gap-6 md:gap-8">
              {sortedDangerProjects.map((project) => (
                <DangerCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </div>

          {/* Interaction Box (Confirmation Modal) - Fixed to this section, NOT blurred */}
          {showDangerZone && dangerZoneConfirmed === null && isDangerZoneInView && (
            <div className="absolute inset-0 z-50 flex items-center justify-center" style={{ filter: 'none' }}>
              <div className="relative w-full max-w-lg mx-4 bg-off-white rounded-lg shadow-2xl p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-brand-black font-erratic mb-4 md:mb-6">
                  DANGER ZONE WARNING
                </h3>
                <p className="text-base md:text-lg text-brand-black font-terminal mb-6 md:mb-8 leading-relaxed">
                  I confirm that I enter the DANGER ZONE, a place where I find no practical value and will maybe even see some weird stuff.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleDangerZoneConfirm}
                    className="flex-1 px-6 py-3 bg-sun-red text-brand-white font-erratic text-lg rounded-lg hover:bg-sun-red/90 active:bg-sun-red/80 focus:outline-none focus:ring-2 focus:ring-sun-red focus:ring-offset-2 transition-colors touch-manipulation"
                    data-interactive
                  >
                    OK
                  </button>
                  <button
                    onClick={handleDangerZoneDecline}
                    className="flex-1 px-6 py-3 bg-brand-black/10 text-brand-black font-terminal text-lg rounded-lg hover:bg-brand-black/20 active:bg-brand-black/30 focus:outline-none focus:ring-2 focus:ring-brand-black focus:ring-offset-2 transition-colors touch-manipulation"
                    data-interactive
                  >
                    Um no, what is this?
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Danger Zone Message (if declined) */}
      {showDangerZone && showDangerZoneMessage && (
        <div className="w-full bg-sun-red py-12 md:py-16 lg:py-20 relative">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 text-center">
            <p className="text-xl md:text-2xl lg:text-3xl font-erratic text-brand-white">
              If you're asking questions, you're not ready yet. Come back later.
            </p>
          </div>
        </div>
      )}

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
      </main>
  );
}
