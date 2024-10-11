
export default function Map({latitude, longitude}){
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    return <>
        <div>
            <iframe
              width="100%"
              height="400"
              frameBorder="0"
              src={`https://www.google.com/maps/embed/v1/place?q=${latitude},${longitude}&key=${apiKey}`}
              allowFullScreen
            ></iframe>
          </div>
    </>
}