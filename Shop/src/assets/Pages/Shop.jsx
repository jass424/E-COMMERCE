
import Hero from '../Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import Newsletter from '../Components/NewsLetter/Newsletter'


function Shop() {
  return (
        <div>
        <Hero/>
        <Popular/>
        <Offers/>
        <NewCollections/>
        <Newsletter/>
        </div>
  )
}

export default Shop