const header_menu = {
    data() {
        return {
            showHeaderMenu: false,
        }
    },
    template: `
        <nav class="menu">
            <label class="menu-btn" for="menu-switch">
                <span></span>
            </label>
            <input id="menu-switch" type="checkbox" @click="showHeaderMenu=!showHeaderMenu">
            <ul class="menu-list" v-show="showHeaderMenu">
                <a href="#" class="menu-list-close-btn" @click="showHeaderMenu = false"></a>
                <span class="menu-list-title">Menu</span>
                <li class="menu-list-item">
                    <a href="#">Man</a>
                    <ul class="menu-sublist">
                        <li class="menu-sublist-item">
                            <a href="#">Accessories</a>
                        </li>
                        <li class="menu-sublist-item">
                            <a href="#">Bags</a>
                        </li>
                        <li class="menu-sublist-item">
                            <a href="#">Denim</a>
                        </li>
                        <li class="menu-sublist-item">
                            <a href="#">T-Shirts</a>
                        </li>
                    </ul>
                </li>
                <li class="menu-list-item">
                    <a href="#">Woman</a>
                    <ul class="menu-sublist">
                        <li class="menu-sublist-item">
                            <a href="#">Accessories</a>
                        </li>
                        <li class="menu-sublist-item">
                            <a href="#">Jackets &amp;&nbsp;Coats</a>
                        </li>
                        <li class="menu-sublist-item">
                            <a href="#">Polos</a>
                        </li>
                        <li class="menu-sublist-item">
                            <a href="#">T-Shirts</a>
                        </li>
                        <li class="menu-sublist-item">
                            <a href="#">Shirts</a>
                        </li>
                    </ul>
                </li>
                <li class="menu-list-item">
                    <a href="#">kids</a>
                    <ul class="menu-sublist">
                        <li class="menu-sublist-item">
                            <a href="#">Accessories</a>
                        </li>
                        <li class="menu-sublist-item">
                            <a href="#">Jackets &amp;&nbsp;Coats</a>
                        </li>
                        <li class="menu-sublist-item">
                            <a href="#">Polos</a>
                        </li>
                        <li class="menu-sublist-item">
                            <a href="#">T-Shirts</a>
                        </li>
                        <li class="menu-sublist-item">
                            <a href="#">Shirts</a>
                        </li>
                        <li class="menu-sublist-item">
                            <a href="#">Bags</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    `
};