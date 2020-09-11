import React from 'react';
import './Login.css';

const Login = (props) => {

    const { email, setEmail, password, setPassword, handleLogin, handleSignUp, hasAccount, setHasAccount, emailError, passwordError } = props;

    const onChangeSetEmail = (e) => setEmail(e.target.value);
    const onChangeSetPassword = (e) => setPassword(e.target.value);

    const onClickSpan = () => setHasAccount(!hasAccount);

    return (
        <section className="login">
            <div className="loginContainer">
                <label>Username</label>
                <input type="text" autoFocus required value={email} onChange={onChangeSetEmail} />
                <p className="errorMsg">{emailError}</p>
                <label>Password</label>
                <input type="password" required value={password} onChange={onChangeSetPassword} />
                <p className="errorMsg">{passwordError}</p>

                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                        <button onClick={handleSignUp} className="button">Sign up</button>
                        <p>Have an account? <span onClick={onClickSpan}>Sign in</span></p>
                        </>
                    ) : (
                        <>
                        <button onClick={handleLogin} className="button">Sign in</button>
                        <p>Dont have an account? <span onClick={onClickSpan}>Sign up</span></p>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}
export default Login;