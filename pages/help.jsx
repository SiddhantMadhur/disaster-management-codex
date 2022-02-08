import Image from "next/image"

const Card = () => {
    return (
        <div>
            <Image src={'/images/earthquake'} />
            <h1 className="text-2xl">
                Earthquake
            </h1>
        </div>
    )
}


function Help() {
    return (
        <div>
            <div className="flex">

                <Card />

            </div>
        </div>
    )
}

export default Help