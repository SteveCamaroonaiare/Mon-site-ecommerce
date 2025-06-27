import React, { useState } from 'react';

const dialColors = [
    { name: "White", hex: "#FFFFFF" },
    { name: "Light Grey", hex: "#F2F2F2" },
    { name: "Black", hex: "#000000" },
    { name: "Blue", hex: "#2C5FA0" },
    { name: "Purple", hex: "#6A4570" },
    { name: "Pink", hex: "#F9A5B1" },
    { name: "Red", hex: "#C60034" },
    { name: "Green", hex: "#16730F" },
];

const ColorSelector = ({ title = "Couleur" }) => {
    const [selectedColor, setSelectedColor] = useState(dialColors[0].name);

    return (
        <div style={{ marginTop: '1rem' }}>
            <h3 style={{ 
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#111827',
                marginBottom: '0.5rem'
            }}>{title}</h3>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
            }}>
                {dialColors.map((color) => (
                    <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        style={{
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '9999px',
                            borderWidth: '2px',
                            borderColor: selectedColor === color.name 
                                ? '#3b82f6' 
                                : (['White', 'Cream', 'Light Grey'].includes(color.name) 
                                    ? '#d1d5db' 
                                    : 'transparent'),
                            backgroundColor: color.hex,
                            transition: 'all 0.2s ease',
                            transform: selectedColor === color.name ? 'scale(1.1)' : 'scale(1)',
                            boxShadow: selectedColor === color.name ? '0 0 0 2px #bfdbfe' : 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                        title={color.name}
                        aria-label={color.name}
                    >
                        {selectedColor === color.name && (
                            <span style={{
                                width: '0.5rem',
                                height: '0.5rem',
                                backgroundColor: 'white',
                                borderRadius: '9999px',
                                opacity: 0.8
                            }}></span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ColorSelector;