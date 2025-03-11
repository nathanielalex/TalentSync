import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard(){
    
    const { authData } = useAuth(); 
    
    const handleClick = () => {
        console.log(authData.role)
    };

    return <div>
        this is dashboard
        <Button onClick={handleClick}></Button>
    </div>
}