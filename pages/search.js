import Header from '../components/Header'
import Footer from '../components/Footer'
import { useRouter } from 'next/dist/client/router'
import { format } from 'date-fns'
import InfoCard from '../components/InfoCard'
import Map from '../components/Map'

const Search = ({ searchResult }) => {
  const router = useRouter()
  const { location, startDate, endDate, noOfGuess } = router.query

  const formatedStartDate = format(new Date(startDate), 'dd MMMM yy')
  const formateEndDate = format(new Date(endDate), 'dd MMMM yy')
  const range = `${formatedStartDate} - ${formateEndDate}`
  return (
    <div>
      <Header PlaceHolder={`${location} | ${range} | ${noOfGuess} guests`} />
      <main className='flex'>
        <section className='flex-grow pt-14 px-6'>
          <p className='text-xs'>
            300+ stays -{range}- for {noOfGuess} number of guests
          </p>
          <h1 className='text-3xl font-semibold mt-2 mb-6'>
            Stays in {location}
          </h1>
          <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap '>
            <p className='button'>Cancellation Flexibility</p>
            <p className='button'>Type of Places</p>
            <p className='button'>Price</p>
            <p className='button'>Rooms and Beds</p>
            <p className='button'>More filters</p>
          </div>
          <div className='flex flex-col'>
            {searchResult?.map(
              ({ img, location, price, total, star, description, title }) => (
                <InfoCard
                  key={img}
                  image={img}
                  location={location}
                  price={price}
                  description={description}
                  total={total}
                  star={star}
                  title={title}
                />
              )
            )}
          </div>
        </section>
        <section className='hidden xl:inline-flex xl:min-w-[600px]'>
          <Map searchResult={searchResult} />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Search

export async function getServerSideProps(context) {
  const searchResult = await fetch('https://links.papareact.com/isz').then(
    (res) => res.json()
  )
  return {
    props: {
      searchResult: searchResult,
    },
  }
}
