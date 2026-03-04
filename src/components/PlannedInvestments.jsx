import React from 'react';
import * as Icons from 'lucide-react';
import config from '../config/config.json';
import investmentsData from '../config/investments.json';

export default function PlannedInvestments({ data }) {
    if (!data || data.year !== config.alapEv) return null;

    const getColor = (colorRef, customColor) => {
        if (customColor) return customColor;
        return config.szinek[colorRef] || config.szinek.elsodleges;
    };

    const getBgColor = (colorRef, customBg) => {
        if (customBg) return customBg;

        // Convert hex to rgba manually for dynamic backgrounds
        const hex = config.szinek[colorRef] || config.szinek.elsodleges;
        let r = 0, g = 0, b = 0;
        if (hex.length === 7) {
            r = parseInt(hex.substring(1, 3), 16);
            g = parseInt(hex.substring(3, 5), 16);
            b = parseInt(hex.substring(5, 7), 16);
        }
        return `rgba(${r}, ${g}, ${b}, 0.15)`;
    };

    return (
        <div style={{ marginBottom: '2.5rem', marginTop: '1rem' }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--brand-primary)' }}>
                Kiemelt fejlesztések, beruházások ({config.alapEv}. évi tervezet)
            </h3>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem',
                justifyContent: 'center'
            }}>
                {investmentsData.map((inv, index) => {
                    const IconComponent = Icons[inv.icon] || Icons.Circle;
                    const strokeColor = getColor(inv.colorRef, inv.customColor);
                    const bgColor = getBgColor(inv.colorRef, inv.customBg);

                    return (
                        <div key={index} className="glass-panel" style={{
                            flex: '1 1 280px',
                            maxWidth: '400px',
                            padding: '1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            gap: '1rem',
                            position: 'relative',
                            overflow: 'hidden',
                            borderTop: `4px solid ${strokeColor}`
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '-20px',
                                right: '-20px',
                                width: '100px',
                                height: '100px',
                                background: bgColor,
                                borderRadius: '50%',
                                opacity: 0.6,
                                pointerEvents: 'none'
                            }}></div>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: 1 }}>
                                <div style={{ padding: '1.2rem', background: bgColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <IconComponent size={28} color={strokeColor} />
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <h4 style={{ fontSize: '1.1rem', margin: 0, marginBottom: '0.5rem', lineHeight: 1.2, color: 'var(--text-main)' }}>{inv.title}</h4>
                                    <span style={{ fontSize: '1rem', fontWeight: 600, color: strokeColor }}>{inv.amount}</span>
                                </div>
                            </div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0, position: 'relative', zIndex: 1, textAlign: 'center' }}>
                                {inv.desc}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
