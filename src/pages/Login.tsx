import { 
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonLoading,
  useIonViewWillEnter,
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {loginUser, request} from '../api/apiConfig'
import { toast } from '../components/toast';
import {setUser} from '../actions/index'

const Login: React.FC = () => {
  const [busy, setBusy] = useState<boolean>(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const history = useHistory()  

  const dispatch = useDispatch()

  const login = () => {
    setBusy(true)
    loginUser('azeem', 'azeem@example.com', 'sample').then(user => {
      setBusy(false)
      if(user.error) {
        toast(user.error, 4000)
      } else {
        toast('Login successful')
        dispatch(setUser(user))
        history.push('/appointments')
      }
    });    
  }
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={busy} /> 
      <IonContent className="ion-padding">
        <IonInput placeholder="Username" onIonChange={(e: any) => {setUsername(e.target.value)}} />
        <IonInput placeholder="Email" onIonChange={(e: any) => {setEmail(e.target.value)}} />
        <IonInput type="password" placeholder="Password" onIonChange={(e: any) => {setPassword(e.target.value)}} />
        <IonButton onClick={login}>Login</IonButton>
        <p>New here? <Link to="/register">Register</Link></p>

      </IonContent>
    </IonPage>
  );
  
};

export default Login;