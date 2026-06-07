import Logo from "../../img/logo.svg";
import {motion} from "framer-motion";

export function FloatingLogo()
{
    const offset = 5;
    return (
        <motion.div
            animate={{y: [-offset, offset, -offset]}}
            transition={{duration: 10, repeat: Infinity}}
            className={"w-24 h-24 aspect-square"}
        >
            <img src={Logo} className={"w-24 h-24 aspect-square"} alt={"Quay Logo"}/>
            <div className={"absolute inset-3 shadow-brand-glow -z-10"}/>

        </motion.div>
    );
}