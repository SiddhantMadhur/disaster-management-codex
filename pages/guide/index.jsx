import Image from "next/image"
import earthquake from '../../public/images/earthquake.svg'
import Link from "next/dist/client/link"
import path from 'path'
import { disasters } from "../../public/disasters"

const Card = (props) => {
    return (
        <div className="flex flex-col  md:flex-row bg-white w-full rounded-lg py-1 px-3">
            <div className="flex-none">
                <Image width={150} height={150} src={`/../public/images/${props.svg}`}></Image>
            </div>
            <div className="p-2">
                <h1 className="text-3xl flex-none mt-3">
                    {props.name}
                </h1>
                <span className="text-lg">
                    {props.definition}...
                </span>
                <br />
                <Link href={props.link}>
                    <a className="text-gray-600 hover:text-gray-900 transition">
                        Read more...
                    </a>
                </Link>
            </div>

        </div>
    )
}

export async function getStaticProps(context) {
    return {
        props: {
            disasters
        }
    }
}


function Help({ disasters }) {
    console.log(disasters)
    return (
        <div>
            <div className="flex flex-col">
                <div className="text-center bg-white mb-4 p-4 rounded-lg">
                    <h1 className="text-5xl">
                        Guide
                    </h1>
                    <p className="text-2xl">
                        Here you can read up on the major natural disasters listed.
                    </p>
                </div>
                <div className="flex flex-col gap-y-5">
                    {
                        disasters.map((doc, key) => (
                            <Card key={key} link={doc.link} name={doc.name} svg={doc.svg} definition={doc.definition}></Card>
                        ))
                    }
                </div>


            </div>
        </div>
    )
}

export default Help