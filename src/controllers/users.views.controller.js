
export const LoginView = (req, res) => {
    res.render("login");
};

export const RegisterView = (req, res) => {
    res.render("register");
};

export const ProfileView = (req, res) => {
    res.render("profile", {
        user: req.user,
    });
};

export const AdminDashboardView = (req, res) => {
    res.render("admin", {
        user: req.user,
    });
};