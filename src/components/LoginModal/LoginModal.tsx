import React, { useContext, useEffect, useState }  from 'react'
import styles from './LoginModal.module.scss'
import { TextField } from '../Common/TextField/TextField';
import { Button } from '../Common/Button/Button';
import { ThemeStateContext } from '@/context/ThemeStateContext';

interface LoginModalProps {
  modalOpen: boolean;
  isModalActiveButton: () => void;
}

interface LoginModalRequestDataProps {
  email             : string;
  password          : string;
}

const defaultValue: LoginModalRequestDataProps = {
  email: "",
  password: "",
}

function LoginModal({ modalOpen, isModalActiveButton }: LoginModalProps) {
  const { theme } = useContext(ThemeStateContext);
  const [ loginData   , setLoginData  ] = useState({ ...defaultValue });
  const [ loginError  , setLoginError ] = useState({
    errorMessage: ""
  })
  useEffect(() => {
    modalOpen
      ? document.documentElement.style.overflow = "hidden"
      : document.documentElement.style.overflow = "unset"
    return () => {
      document.documentElement.style.overflow = "unset"
    }
  }, [modalOpen]);

  const onChange = (field: string, value: string) => {
    setLoginData((prev) => { return {...prev, [field]: value}})
  }

  return (
    <div className={`${styles.login__area} ${theme === 'dark' ? styles.dark : undefined}`}>
      <div className={styles.background} />
      <div className={styles.whiteground}>
        <div className={styles.close} onClick={isModalActiveButton}>
          <span></span>
          <span></span>
        </div>
        <h2>Gym Dak</h2>
        <div className={styles.login__input}>
            <TextField
              name            = 'email'
              value           = {loginData.email}
              type            = 'email'
              placeholder     = '이메일'
              onChangeEvent   = {onChange}
              pattern         = ".+@globex\.com"
            />
            <TextField
              name            = 'password'
              value           = {loginData.password}
              type            = 'password'
              placeholder     = '비밀번호'
              onChangeEvent   = {onChange}
              // onKeyDown       = {true}
              // onKeyDownEvent  = {isLoginSubmit}
            />
            {/* {loginError.errorMessage && 
              <div className={styles.error}>
                <Image src={AlertIconUrl} alt='경고 아이콘' width={18} height={18}/>
                <div className={styles.message}>
                  {loginError.errorMessage}
                </div>
              </div>
            } */}
            <Button value='로그인' onClickEvent={()=>{}} />
          </div>
          {/* <div className={styles.find__area}>
            <span onClick={() => moveRegisterPage()} >
              회원가입
            </span>
            <div></div>
            <span onClick={() => moveFindPage()} >
              비밀번호 찾기
            </span>
          </div> */}
          {/* <div className={styles.social}>
            <div className={styles.title}>
              다른 계정으로 로그인
            </div>
            <div className={styles.btn__area}>
              <Button onClickEvent={handleKakaoOauth}   image={"KAKAO"}   value=''/>
              <Button onClickEvent={handleGoogleOauth}  image={"GOOGLE"}  value=''/>
              <Button onClickEvent={handleNaverOauth}   image={"NAVER"}   value=''/>
            </div>
          </div> */}
      </div>
    </div>
  )
}

export { LoginModal };