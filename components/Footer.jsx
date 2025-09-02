

import { FaGithub, FaLinkedin } from 'react-icons/fa'
const Footer = () => {
    return (
        <footer className="flex max-md:gap-2 justify-between items-center max-md:flex-col p-4">
            
            <div>
                <p className="text-muted-foreground text-sm text-balance">
                    &copy; 2025 BlackAsh. All rights reserved.
                </p>
            </div>
            <div className="flex gap-4 items-center justify-between">
                <a href="https://github.com/BLACK-ASH" target='_blank'>
                    <FaGithub className="size-6" />
                </a>
                <a href="https://www.linkedin.com/in/ashif-shaikh-ash" target='_blank'>
                    <FaLinkedin className="size-6" />
                </a>
            </div>
        </footer>
    )
}

export default Footer