import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [meals, setMeals] = useState([])

  useEffect(() => {
    // Calling the API inside Docker
    axios.get('/api/meals')
      .then(res => setMeals(res.data))
      .catch(err => console.error('Error fetching meals:', err))
  }, [])

  // --- Styles Objects (Inspired by image_0.png) ---
  const styles = {
    appContainer: {
      backgroundColor: '#000000', // Pitch Black Background
      color: '#FFFFFF',
      fontFamily: "'Segoe UI', Roboto, sans-serif",
      minHeight: '100vh',
      direction: 'rtl', // Right to Left for Arabic
      padding: '40px 20px',
    },
    headerSection: {
      textAlign: 'center',
      marginBottom: '50px',
    },
    mainTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    subTitle: {
      color: '#A0A0A0', // Grayish Subtitle
      fontSize: '1rem',
      fontWeight: '300',
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    card: {
      backgroundColor: '#111111', // Very Dark Gray Card
      borderRadius: '15px',
      overflow: 'hidden', // to round image corners
      position: 'relative',
      border: '1px solid #222', // Subtle Border
      transition: 'transform 0.3s ease',
    },
    cardImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      display: 'block',
    },
    priceBadge: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: 'rgba(0,0,0,0.6)',
      color: '#FFFFFF',
      padding: '5px 12px',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: 'bold',
    },
    cardContent: {
      padding: '15px',
    },
    mealName: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '8px',
    },
    mealDescription: {
      color: '#A0A0A0',
      fontSize: '0.9rem',
      marginBottom: '15px',
      lineHeight: '1.4',
    },
    cardFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '10px',
    },
    addButton: {
      backgroundColor: '#F2994A', // Orange-Gold from image_0.png
      color: '#000000',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '0.9rem',
    },
    startFrom: {
      color: '#A0A0A0',
      fontSize: '0.8rem',
    }
  }
  // --- End of Styles Objects ---

  return (
    <div style={styles.appContainer}>
      
      {/* Header Section */}
      <div style={styles.headerSection}>
        <h1 style={styles.mainTitle}>اختر طبقك المفضل</h1>
        <p style={styles.subTitle}>مكونات طازجة، تحضير فوري، ومذاق استثنائي في كل قضمة.</p>
      </div>

      {/* Meals Grid */}
      <div style={styles.gridContainer}>
        {meals.map(meal => (
          <div key={meal._id} style={styles.card}>
            {/* Price Badge (Positioned Absolute) */}
            <div style={styles.priceBadge}>{meal.price} ر.س</div>
            
            {/* Fallback Image if your DB doesn't have an 'image_url' yet */}
            <img 
              src={meal.imageUrl || 'https://via.placeholder.com/300x200?text=Meal'} 
              alt={meal.name} 
              style={styles.cardImage} 
            />
            
            <div style={styles.cardContent}>
              <h3 style={styles.mealName}>{meal.name}</h3>
              <p style={styles.mealDescription}>{meal.description}</p>
              
              <div style={styles.cardFooter}>
                <button style={styles.addButton}>+ أضف</button>
                <span style={styles.startFrom}>يبدأ من</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App