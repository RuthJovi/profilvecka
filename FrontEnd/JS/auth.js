const authForm = document.getElementById('auth-form');
        const authToggle = document.getElementById('auth-toggle');
        const authTitle = document.getElementById('auth-title');
        const authSubtitle = document.getElementById('auth-subtitle');
        const toggleText = document.getElementById('toggle-text');
        const authCard = document.getElementById('auth-card');
        const successCard = document.getElementById('success-card');

        let isLogin = true;

        // Switch between Login and Signup modes
        authToggle.addEventListener('click', (e) => {
            e.preventDefault();
            isLogin = !isLogin;

            authTitle.innerText = isLogin ? 'Welcome Back' : 'Create Account';
            authSubtitle.innerText = isLogin ? 'Sign in to access your student community.' : 'Join thousands of students learning together.';
            toggleText.innerText = isLogin ? "Don't have an account?" : "Already have an account?";
            authToggle.innerText = isLogin ? "Create one" : "Sign in";
            document.getElementById('auth-icon').innerText = isLogin ? '👋' : '🚀';
        });

        // Handle Login Logic
        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const usernameInput = document.getElementById('username').value;

            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/users');
                const users = await res.json();

                const user = isLogin
                    ? users.find(u => u.username.toLowerCase() === usernameInput.toLowerCase())
                    : { username: usernameInput, name: usernameInput };

                if (user || !isLogin) {
                    // Save user to LocalStorage
                    localStorage.setItem('user', JSON.stringify(user || { username: usernameInput }));

                    // Show Success UI
                    authCard.style.display = 'none';
                    successCard.style.display = 'flex';
                    setTimeout(() => successCard.classList.add('active'), 10);
                    document.getElementById('welcome-name').innerText = `Welcome, ${usernameInput}!`;
                } else {
                    alert('User not found. Try "Bret" for the demo.');
                }
            } catch (err) {
                alert('Connection error.');
            }
        });