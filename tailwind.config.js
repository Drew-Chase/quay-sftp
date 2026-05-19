import {heroui} from "@heroui/react";

/**
 * Quay — Tailwind config
 * Mirrors the tokens defined in styles.css :root.
 * Designed for a dark, IDE-style surface with a single sky-blue accent
 * and oklch-defined semantic + file-type hues.
 */
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        // ─── Typography ─────────────────────────────────────────────────────────
        fontFamily: {
            sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'ui-monospace', '"SF Mono"', 'Menlo', 'monospace'],
        },

        // Custom scale tuned for an IDE — bodies are 12–13px, not 14–16px.
        // Each entry: [size, { lineHeight, letterSpacing? }]
        fontSize: {
            // Micro labels — uppercase eyebrows, kbd, status bar
            '2xs': ['10px', {lineHeight: '1.4', letterSpacing: '0.08em'}],
            'micro': ['10.5px', {lineHeight: '1.4', letterSpacing: '0.08em'}],

            // UI body — table cells, menus, buttons
            'xs': ['11px', {lineHeight: '1.4'}],
            'xs+': ['11.5px', {lineHeight: '1.5'}],
            'sm': ['12px', {lineHeight: '1.45'}],
            'sm+': ['12.5px', {lineHeight: '1.55'}],
            'base': ['13px', {lineHeight: '1.5'}],   // app default
            'md': ['13.5px', {lineHeight: '1.5'}],   // conn-name

            // Section + page
            'lg': ['14px', {lineHeight: '1.5'}],
            'xl': ['16px', {lineHeight: '1.4'}],
            '2xl': ['20px', {lineHeight: '1.3', letterSpacing: '-0.01em'}],
            '3xl': ['28px', {lineHeight: '1.15', letterSpacing: '-0.025em'}], // connections-title
            'display': ['56px', {lineHeight: '1', letterSpacing: '-0.04em', fontWeight: '600'}], // brand-name
        },

        fontWeight: {
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
        },

        letterSpacing: {
            tightest: '-0.04em', // brand wordmark
            tighter: '-0.025em',
            tight: '-0.01em',
            normal: '0',
            wide: '0.01em',
            wider: '0.04em',
            eyebrow: '0.08em', // section heads
            label: '0.10em', // sidebar eyebrows
        },

        // ─── Radii ──────────────────────────────────────────────────────────────
        borderRadius: {
            none: '0',
            xs: '3px',  // checkbox
            sm: '4px',  // kbd, tiny chips
            DEFAULT: '6px',
            md: '6px',  // --radius-sm
            lg: '8px',  // inputs, buttons
            xl: '10px', // --radius (cards)
            '2xl': '14px', // --radius-lg (modals, quick-connect)
            full: '9999px',
        },

        // ─── Borders ────────────────────────────────────────────────────────────
        borderWidth: {
            DEFAULT: '1px',
            0: '0',
            1: '1px',
            2: '2px',
        },

        // ─── Shadows ────────────────────────────────────────────────────────────
        boxShadow: {
            none: 'none',
            // The two tokens defined in :root
            1: '0 1px 0 rgba(255,255,255,0.04) inset, 0 1px 2px rgba(0,0,0,0.6)',
            2: '0 10px 40px -10px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.04) inset',

            // Focus ring (accent-soft, 3px) — matches input:focus
            focus: '0 0 0 3px oklch(0.78 0.15 230 / 0.16)',

            // Glow used on status dots + brand mark
            glow: '0 0 8px oklch(0.78 0.15 230 / 0.35)',
            'glow-ok': '0 0 8px oklch(0.78 0.15 155)',

            // Brand-mark drop shadow
            'brand-glow': '0 8px 32px oklch(0.78 0.15 230 / 0.35)',
        },

        // ─── Motion ─────────────────────────────────────────────────────────────
        transitionDuration: {
            DEFAULT: '180ms',
            120: '120ms', // micro press
            160: '160ms',
            180: '180ms', // standard hover
            250: '250ms',
            350: '350ms', // dock resize
            450: '450ms', // page enter
            500: '500ms', // row stagger
        },
        transitionTimingFunction: {
            DEFAULT: 'cubic-bezier(0.2, 0.7, 0.2, 1)', // the house curve
            'out-soft': 'cubic-bezier(0.2, 0.7, 0.2, 1)',
            'in-soft': 'cubic-bezier(0.8, 0, 0.8, 0.3)',
        },

        extend: {
            // ─── App-specific color tokens ──────────────────────────────────────
            // These extend (not replace) defaults so HeroUI's generated palette
            // stays intact. Semantic HeroUI colors live in the plugin config below.
            colors: {
                // App canvas + elevation
                bg: '#000',
                surface: {
                    0: '#050505',
                    1: '#0b0b0c',
                    2: '#131316',
                    3: '#1a1a1e',
                },

                // Text ramp (high → low contrast)
                ink: {
                    DEFAULT: '#f6f7f9',
                    1: '#f6f7f9',
                    2: '#aeb1b8',
                    3: '#6b6e76',
                    4: '#45474d',
                },

                // Hairlines (used as borders, NOT as text)
                hairline: {
                    DEFAULT: 'rgba(255, 255, 255, 0.06)',
                    strong: 'rgba(255, 255, 255, 0.12)',
                },

                // The brand accent (sky-blue) and its soft/glow companions
                accent: {
                    DEFAULT: 'oklch(0.78 0.15 230)',
                    soft: 'oklch(0.78 0.15 230 / 0.16)',
                    glow: 'oklch(0.78 0.15 230 / 0.35)',
                    ink: '#001a2c',
                },

                // Semantic — all share L=0.78–0.82, C=0.15–0.2 so they live on one ring
                ok: 'oklch(0.78 0.15 155)',
                warn: 'oklch(0.82 0.15 80)',
                violet: 'oklch(0.72 0.18 295)',
                pink: 'oklch(0.74 0.17 5)',

                // File-type + connection-protocol swatches
                filetype: {
                    folder: {from: 'oklch(0.32 0.10 230)', to: 'oklch(0.18 0.05 230)', fg: 'oklch(0.85 0.15 230)'},
                    js: {bg: 'oklch(0.30 0.15 90)', fg: 'oklch(0.90 0.18 90)'},
                    ts: {bg: 'oklch(0.30 0.15 240)', fg: 'oklch(0.90 0.18 240)'},
                    py: {bg: 'oklch(0.30 0.15 155)', fg: 'oklch(0.90 0.18 155)'},
                    rb: {bg: 'oklch(0.30 0.15 25)', fg: 'oklch(0.90 0.18 25)'},
                    json: {bg: 'oklch(0.30 0.10 50)', fg: 'oklch(0.90 0.15 50)'},
                    img: {bg: 'oklch(0.30 0.15 295)', fg: 'oklch(0.90 0.18 295)'},
                    zip: {bg: 'oklch(0.30 0.12 60)', fg: 'oklch(0.90 0.15 60)'},
                    env: {bg: 'oklch(0.30 0.15 0)', fg: 'oklch(0.90 0.18 0)'},
                    yml: {bg: 'oklch(0.30 0.15 5)', fg: 'oklch(0.90 0.18 5)'},
                    sh: {bg: 'oklch(0.30 0.12 130)', fg: 'oklch(0.90 0.15 130)'},
                    sql: {bg: 'oklch(0.30 0.12 270)', fg: 'oklch(0.90 0.15 270)'},
                },

                // Tag pills (prod/stag/dev) — bg/border/fg triplets
                tag: {
                    prod: {bg: 'oklch(0.20 0.05 25)', border: 'oklch(0.40 0.12 25)', fg: 'oklch(0.78 0.20 25)'},
                    stag: {bg: 'oklch(0.20 0.05 80)', border: 'oklch(0.40 0.12 80)', fg: 'oklch(0.85 0.15 80)'},
                    dev: {bg: 'oklch(0.20 0.05 155)', border: 'oklch(0.40 0.12 155)', fg: 'oklch(0.85 0.15 155)'},
                },

                // Syntax tokens used in the dock editor
                syntax: {
                    keyword: 'oklch(0.78 0.18 295)',
                    fn: 'oklch(0.85 0.15 230)',
                    string: 'oklch(0.85 0.15 90)',
                    number: 'oklch(0.85 0.15 25)',
                    comment: '#45474d',
                    operator: '#aeb1b8',
                    property: 'oklch(0.85 0.15 155)',
                    type: 'oklch(0.85 0.15 230)',
                    tag: 'oklch(0.80 0.18 5)',
                },

                // macOS traffic lights — keep as literals; they're brand-locked.
                traffic: {
                    red: '#ff5f57',
                    yellow: '#febc2e',
                    green: '#28c840',
                },
            },

            // Spacing — Tailwind's default 0.25rem scale is fine; add IDE-specific
            // anchors only where the design uses them.
            spacing: {
                '0.25': '1px',
                '0.75': '3px',
                '1.25': '5px',
                '1.75': '7px',
                '2.25': '9px',
                '3.25': '13px', // form field padding-x
                '4.5': '18px',
                // Fixed-size chrome
                'titlebar': '44px',
                'tab': '32px',
                'sidebar': '240px',
                'gutter': '44px',
            },

            // Backgrounds — the subtle grid + accent halo on the start screen.
            backgroundImage: {
                'grid-faint':
                    'linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)',
                'accent-halo':
                    'radial-gradient(ellipse 50% 60% at 28% 50%, oklch(0.78 0.15 230 / 0.07), transparent 60%), linear-gradient(180deg, transparent 0%, oklch(0.78 0.15 230 / 0.02) 100%)',
                'accent-fill':
                    'linear-gradient(135deg, oklch(0.78 0.15 230), oklch(0.72 0.18 295))',
            },
            backgroundSize: {
                'grid-56': '56px 56px',
            },

            backdropBlur: {
                modal: '10px',
            },

            // Z-index landmarks
            zIndex: {
                traffic: 30,
                sticky: 5,
                dockHandle: 4,
                statusBar: 2,
                modal: 80,
            },

            // Animations defined in styles.css — exposed as Tailwind utilities
            keyframes: {
                fadeIn: {from: {opacity: '0'}, to: {opacity: '1'}},
                fadeUp: {
                    from: {opacity: '0', transform: 'translateY(10px)'},
                    to: {opacity: '1', transform: 'translateY(0)'},
                },
                rowIn: {
                    from: {opacity: '0', transform: 'translateY(6px)'},
                    to: {opacity: '1', transform: 'translateY(0)'},
                },
                scaleIn: {
                    from: {opacity: '0', transform: 'scale(0.96)'},
                    to: {opacity: '1', transform: 'scale(1)'},
                },
                floatY: {
                    '0%, 100%': {transform: 'translateY(0)'},
                    '50%': {transform: 'translateY(-6px)'},
                },
                pulse: {
                    '0%, 100%': {boxShadow: '0 0 0 0 oklch(0.78 0.15 155)', opacity: '1'},
                    '50%': {boxShadow: '0 0 0 4px transparent', opacity: '0.7'},
                },
                blink: {'0%, 50%': {opacity: '1'}, '50.01%, 100%': {opacity: '0'}},
                shimmer: {from: {transform: 'translateX(-100%)'}, to: {transform: 'translateX(100%)'}},
                spin: {to: {transform: 'rotate(360deg)'}},
                slideInLeft: {
                    from: {transform: 'translateX(-4px)', opacity: '0'},
                    to: {transform: 'translateX(0)', opacity: '1'},
                },
            },
            animation: {
                'fade-in': 'fadeIn 0.45s cubic-bezier(0.2, 0.7, 0.2, 1) both',
                'fade-up': 'fadeUp 0.5s cubic-bezier(0.2, 0.7, 0.2, 1) both',
                'row-in': 'rowIn 0.5s cubic-bezier(0.2, 0.7, 0.2, 1) both',
                'scale-in': 'scaleIn 0.25s cubic-bezier(0.2, 0.7, 0.2, 1) both',
                'float-y': 'floatY 6s ease-in-out infinite',
                'pulse-ok': 'pulse 2.5s ease-in-out infinite',
                'blink': 'blink 1s steps(2) infinite',
                'shimmer': 'shimmer 1.8s linear infinite',
                'spin-slow': 'spin 0.9s linear infinite',
                'slide-in-left': 'slideInLeft 0.25s ease-out both',
            },
        },
    },
    plugins: [heroui({
        defaultTheme: 'dark',
        themes: {
            dark: {
                colors: {
                    background: '#000',
                    foreground: '#f6f7f9',
                    divider: 'rgba(255, 255, 255, 0.06)',
                    focus: '#21c8ff',
                    content1: {
                        DEFAULT: '#0b0b0c',
                        foreground: '#f6f7f9',
                    },
                    content2: {
                        DEFAULT: '#131316',
                        foreground: '#aeb1b8',
                    },
                    content3: {
                        DEFAULT: '#1a1a1e',
                        foreground: '#6b6e76',
                    },
                    content4: {
                        DEFAULT: '#242429',
                        foreground: '#45474d',
                    },
                    default: {
                        DEFAULT: '#1a1a1e',
                        foreground: '#f6f7f9',
                        50: '#050505',
                        100: '#0b0b0c',
                        200: '#131316',
                        300: '#1a1a1e',
                        400: '#45474d',
                        500: '#6b6e76',
                        600: '#aeb1b8',
                        700: '#d1d3d8',
                        800: '#e8e9ec',
                        900: '#f6f7f9',
                    },
                    primary: {
                        DEFAULT: '#21c8ff',
                        foreground: '#001a2c',
                        50: '#03141a',
                        100: '#052029',
                        200: '#08303d',
                        300: '#0c4659',
                        400: '#116480',
                        500: '#21c8ff',
                        600: '#00b4f0',
                        700: '#009ed8',
                        800: '#007eb7',
                        900: '#005187',
                    },
                    secondary: {
                        DEFAULT: '#ae89ff',
                        foreground: '#fff',
                    },
                    success: {
                        DEFAULT: '#59d38c',
                        foreground: '#fff',
                    },
                    warning: {
                        DEFAULT: '#f7b83d',
                        foreground: '#000',
                    },
                    danger: {
                        DEFAULT: '#ff5f5b',
                        foreground: '#fff',
                    },
                },
            },
        },
    })],
};
