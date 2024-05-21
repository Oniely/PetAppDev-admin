import Image from "next/image";

interface Props {
    loading: boolean;
}

const Loading = ({ loading }: Props) => {
    return (
        <section className={`fixed inset-0 h-screen bg-white/50 z-[1000] ${loading ? "block" : "hidden"}`}>
            <div className="w-full h-full flex-1 flex items-center justify-center">
                <Image src='/images/dogo-loading.gif' alt="dogo" width={300} height={300}/>
                {/* <div className="animate-bounce">LOADING...</div> */}
            </div>
        </section>
    )
}

export default Loading