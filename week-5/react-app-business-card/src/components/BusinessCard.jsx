

export const BusinessCard = ({ userDetails }) => {
    let id = 0;
    return (
        <div style={styles.card}>
            <h1 style={styles.name}>{userDetails.name}</h1>
            <p style={styles.description}>{userDetails.description}</p>
            <h1 style={styles.interestsHeader}>Interests</h1>
            <ul style={styles.interestsLists}>
                {userDetails.interests.map((interest) => {
                    return <li key={id++} style={styles.interestItem}>{interest}</li>
                })}
            </ul>
            <div style={styles.socialLinks}>
                <a style={{ ...styles.link, marginLeft: '0px' }} target="_blank" href={userDetails.linkedInProfile} rel="noopener noreferrer">LinkedIn</a>
                <a style={styles.link} href={userDetails.twitterProfile} target="_blank" rel="noopener noreferrer" >Twitter</a>
            </div>
        </div>
    )
}

const styles = {
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        margin: '20px',
        maxWidth: '550px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f8f9fa'
    },
    name: {
        fontSize: '24px',
        marginBottom: '10px',
        color: '#333',
    },
    description: {
        fontSize: '16px',
        marginBottom: '10px',
        color: '#333',
    },
    interestsHeader: {
        fontSize: '18px',
        marginBottom: '10px',
        color: '#333'
    },
    interestsLists: {
        listStyle: 'none',
        padding: '0px',
        margin: '0px'
    },
    interestItem: {
        fontSize: '15px',
        marginBottom: '5px',
        color: '#555',
    },
    socialLinks: {
        display: 'flex',
        marginBottom: '20px'
    },
    link: {
        textDecoration: 'none',
        color: '#fff',
        backgroundColor: '#007BFF',
        borderRadius: '5px',
        margin: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        padding: '10px 20px'
    }
}