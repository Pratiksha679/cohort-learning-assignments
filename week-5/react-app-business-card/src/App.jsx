import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BusinessCard } from './components/BusinessCard';

function App() {
  const userDetails = {
    name: "Pratiksha Salian",
    description: "Software Engineer and just started self paced development learning",
    interests: [
      "Dancing", "Cooking", "Self care"
    ],
    linkedInProfile: "https://www.linkedin.com/in",
    twitterProfile: "https://x.com/?lang=en"
  }
  return (
    <>
      <BusinessCard userDetails={userDetails} />
    </>
  )
}

export default App
