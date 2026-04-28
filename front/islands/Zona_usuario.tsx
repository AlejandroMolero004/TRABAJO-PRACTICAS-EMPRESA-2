import { FunctionalComponent } from "preact";
import { User } from "../routes/(plataform)/zona_usuario.tsx";

type Props = {
  users: User[]; 
};



const Zona_usuario:FunctionalComponent<Props> = ({users}) => {
    return (
        <div>
            <h1>Zona de Usuario</h1>
            <h2 style={{ color: 'white' , display: 'flex' , alignItems: 'center' , justifyContent: 'center' }}>Conversaciones guardadas</h2>
            <ul class ="conversacion-list">
                {users.map((user) => (
                    <li key={user.id}>
                     
                        <div class="conversacion">
                            <div>
                                {user.cobol}                          
                            </div> 
                                     
                            <div>
                                {user.python}                          
                            </div>    
                        </div>

                        
                                       
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Zona_usuario;