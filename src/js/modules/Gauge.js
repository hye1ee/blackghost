import React, { useState, useEffect } from 'react';
import '../../css/Module.css';

export default function Gauge(props) {
    return (
        <div className='gaugeWrapper'>
            <div className='gaugeBar' style={{ width: `${props.value}%`, height: '100%' }}>
            </div>
        </div>
    );
}