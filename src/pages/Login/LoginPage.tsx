import { Alert, Button, Form } from 'antd';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { USERS_URL } from '../../shared/constant';
import { FormButton, Input, InputCheck, Title3 } from '../../styled/Login';
import './Login.css';



type LoginValues = {
    userName: string;
    
}
type UserItem = {
    name: string;
    username: string;
    email: string;
    avatar: string;
    id: string;
    data:string;
  };
  interface LoginPageProps{
  children: React.ReactNode
  value: string
  onChange(event: React.ChangeEvent<HTMLInputElement>):void
}


const  LoginPage = ({ value,children}:LoginPageProps) =>  {
    const [error,setError] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [disabled,setDisabled] = useState(false)
    const { register,  formState: {errors}} = useForm();
    
    const onFinish = async ({ userName }: LoginValues) => {
        setIsLoading(true)
        const response = await fetch(USERS_URL)
        const usersList: UserItem[] = await response.json()
        const foundUser = usersList.find((user) => user.username === userName);
        
     if(!foundUser) {
      setError("Такого пользователя не существует!");
     }else{
         setError("")
     setIsLoading(false)


     console.log(foundUser)
    }
    
 
    return (
      <React.Fragment>
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{ userName: '', password: '' }}
          onFinish={onFinish}
        >
            
  
            {error && (
              <Alert className='Alert' message='Такого пользователя не существует' type='error' />
            )}
                <Form.Item
                  name='userName'
                  rules={[{ required: true, message: 'Пожалуйста введите ваш логин' }]}
                >
                   <Title3>Логин</Title3>
                   <Input {...register('name', { required: true, maxLength: 30 })} 
                   
                    placeholder='Логин'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </Form.Item>
          
                <Form.Item
                  name='password'
                  rules={[{ required: true, message: 'Пожалуйста введите ваш пароль' }]}
                >
                   <Title3>Пароль</Title3>
                   <Input 
                   
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder='Пароль'
                    />
                  
                </Form.Item>
                <div> <InputCheck /></div>
          
                <Form.Item>
                <FormButton>
                  <Button block
                    type="primary"
                    loading={isLoading}
                    htmlType='submit'
                    disabled={disabled}
                  >
                    Вход
                  </Button>
                  </FormButton>
                </Form.Item> 
        </Form>
        </React.Fragment>
)
    }
  }
  export default LoginPage;