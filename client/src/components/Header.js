import React from 'react';

const styles = {
    width: '100%',
    height: '5rem',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    boxShadow: '0 .5rem 1.2rem rgba(0, 0, 0, .45)',
}

const Header = () => (
    <div style={styles}>
        <div className="container"
            style={{
                height: '5rem',
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
            <p>Steve Failla</p>
            <p>FCC Nightlife App</p>
        </div>
    </div>
)

export default Header;