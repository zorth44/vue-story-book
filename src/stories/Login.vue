<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps<{
    email?: string
    password?: string
    rememberMe?: boolean
    isLoading?: boolean
    error?: string
    announcements?: Array<{title: string, content: string}>
}>();

const email = ref(props.email || '');
const password = ref(props.password || '');
const rememberMe = ref(props.rememberMe || false);
const showPassword = ref(false);
const currentAnnouncementIndex = ref(0);
let carouselInterval: number | null = null;

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const nextAnnouncement = () => {
    if (props.announcements && props.announcements.length > 0) {
        currentAnnouncementIndex.value = (currentAnnouncementIndex.value + 1) % props.announcements.length;
    }
};

onMounted(() => {
    if (props.announcements && props.announcements.length > 1) {
        carouselInterval = window.setInterval(nextAnnouncement, 5000);
    }
});

onBeforeUnmount(() => {
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }
});

// 添加注册相关的状态
const isRegistering = ref(false);
const registerForm = ref({
    username: '',
    product: '',
    role: '',
    phone: '',
    email: ''
});

// 产品和角色选项
const products = [
    { value: 'product1', label: '产品一' },
    { value: 'product2', label: '产品二' },
    { value: 'product3', label: '产品三' }
];

const roles = [
    { value: 'role1', label: '角色一' },
    { value: 'role2', label: '角色二' },
    { value: 'role3', label: '角色三' }
];

const toggleRegister = () => {
    isRegistering.value = !isRegistering.value;
};

// 添加手机号验证相关状态
const phoneError = ref('');

// 手机号验证函数
const validatePhone = (phone: string) => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phone) {
        phoneError.value = '请输入手机号';
        return false;
    }
    if (!phoneRegex.test(phone)) {
        phoneError.value = '请输入正确的手机号格式';
        return false;
    }
    phoneError.value = '';
    return true;
};

// 手机号输入处理
const handlePhoneInput = () => {
    validatePhone(registerForm.value.phone);
};
</script>

<template>
    <div class="h-screen w-full flex items-center justify-center bg-white">
        <div class="max-w-md w-full ">

            <img
                src="./assets/assets.png"
                alt="Logo"
                class="absolute top-8 left-8 w-48 h-16 object-contain"
            />

            <div class="text-center">
                <h2 class="mt-6 text-3xl font-bold text-gray-900">大数据开发框架</h2>
                <p class="mt-2 text-sm text-gray-600" v-if="!isRegistering">使用您的账号登录大数据开发框架</p>
                <p class="mt-2 text-sm text-gray-600" v-else>注册账号</p>
            </div>

            <!-- 登录表单 -->
            <form v-if="!isRegistering" class="mt-8 space-y-6">

                <div v-if="props.announcements && props.announcements.length > 0" 
                 class="mt-4 overflow-hidden rounded-lg">
                <div class="relative" style="min-height: 80px;">
                    <transition-group name="carousel" tag="div" class="relative">
                        <div v-for="(announcement, index) in props.announcements" :key="index"
                             v-show="index === currentAnnouncementIndex"
                             class="p-3 rounded-md bg-red-50 text-red-700 border border-red-200 absolute w-full">
                            <div class="font-medium">{{ announcement.title }}</div>
                            <div class="mt-1 text-sm">{{ announcement.content }}</div>
                        </div>
                    </transition-group>
                </div>
                
                <!-- 轮播指示器 -->
                <div v-if="props.announcements.length > 1" class="flex justify-center mt-8 space-x-1">
                    <button v-for="(_, index) in props.announcements" :key="index"
                            @click="currentAnnouncementIndex = index"
                            :class="[
                                'w-2 h-2 rounded-full focus:outline-none',
                                index === currentAnnouncementIndex ? 'bg-red-600' : 'bg-gray-300'
                            ]">
                    </button>
                </div>
            </div>

                <div>
                    <fieldset class="border rounded-lg px-3 pt-1 pb-3">
                        <legend class="text-sm font-medium text-gray-700 px-1">账户名</legend>
                        <input id="email" v-model="email" type="text" required
                            class="appearance-none block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                            placeholder="请输入您的账号" />
                    </fieldset>
                </div>

                <div>
                    <fieldset class="border rounded-lg px-3 pt-1 pb-3">
                        <legend class="text-sm font-medium text-gray-700 px-1">密码</legend>
                        <div class="relative flex items-center">
                            <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" required
                                class="appearance-none block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm pr-6"
                                placeholder="请输入您的密码" />
                            <button type="button" @click.stop="togglePasswordVisibility"
                                class="absolute right-0 flex items-center text-gray-400 hover:text-gray-500 focus:outline-none">
                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <g v-if="showPassword">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </g>
                                    <g v-else>
                                        <path d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" />
                                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </fieldset>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input id="remember-me" v-model="rememberMe" type="checkbox"
                            class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                        <label for="remember-me" class="ml-2 block text-sm text-gray-900">记住密码</label>
                    </div>

                    <div class="text-sm relative group">
                        <a href="#" class="font-medium text-red-600 hover:text-red-500">忘记密码</a>
                        <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
                            若有注册或无法登录等问题请联系管理员-王成卓
                            <div class="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 -mt-1 rotate-45 bg-gray-800"></div>
                        </div>
                    </div>
                </div>

                <div>
                    <button type="submit" :disabled="isLoading"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed">
                        <span v-if="isLoading">Loading...</span>
                        <span v-else>登录</span>
                    </button>
                    <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
                </div>

                <p class="text-center text-sm text-gray-500">
                    还没有账号？
                    <button type="button" @click="toggleRegister"
                        class="font-medium text-red-600 hover:text-red-500">
                        注册
                    </button>
                </p>
            </form>

            <!-- 注册表单 -->
            <form v-else class="mt-8 space-y-6">
                <!-- 账户名 -->
                <div>
                    <fieldset class="border rounded-lg px-3 pt-1 pb-3">
                        <legend class="text-sm font-medium text-gray-700 px-1">账户名</legend>
                        <input v-model="registerForm.username" type="text" required
                            class="appearance-none block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                            placeholder="请输入账户名" />
                    </fieldset>
                </div>

                <!-- 产品选择 -->
                <div>
                    <fieldset class="border rounded-lg px-3 pt-1 pb-3">
                        <legend class="text-sm font-medium text-gray-700 px-1">选择产品</legend>
                        <select v-model="registerForm.product"
                            class="block w-full border-0 p-0 text-gray-900 focus:outline-none focus:ring-0 sm:text-sm">
                            <option value="">请选择产品</option>
                            <option v-for="product in products" :key="product.value" :value="product.value">
                                {{ product.label }}
                            </option>
                        </select>
                    </fieldset>
                </div>

                <!-- 角色选择 -->
                <div>
                    <fieldset class="border rounded-lg px-3 pt-1 pb-3">
                        <legend class="text-sm font-medium text-gray-700 px-1">选择角色</legend>
                        <select v-model="registerForm.role"
                            class="block w-full border-0 p-0 text-gray-900 focus:outline-none focus:ring-0 sm:text-sm">
                            <option value="">请选择角色</option>
                            <option v-for="role in roles" :key="role.value" :value="role.value">
                                {{ role.label }}
                            </option>
                        </select>
                    </fieldset>
                </div>

                <!-- 手机号 -->
                <div>
                    <!-- 注册表单中的手机号输入框部分 -->
                    <div>
                        <fieldset class="border rounded-lg px-3 pt-1 pb-3" :class="{'border-red-500': phoneError}">
                            <legend class="text-sm font-medium text-gray-700 px-1">手机号</legend>
                            <input v-model="registerForm.phone" 
                                   type="tel" 
                                   required
                                   @input="handlePhoneInput"
                                   class="appearance-none block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                                   placeholder="请输入手机号" />
                        </fieldset>
                        <p v-if="phoneError" class="mt-1 text-sm text-red-600">{{ phoneError }}</p>
                    </div>
                </div>

                <!-- 邮箱 -->
                <div>
                    <fieldset class="border rounded-lg px-3 pt-1 pb-3">
                        <legend class="text-sm font-medium text-gray-700 px-1">邮箱</legend>
                        <input v-model="registerForm.email" type="email" required
                            class="appearance-none block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                            placeholder="请输入邮箱" />
                    </fieldset>
                </div>

                <!-- 注册按钮 -->
                <div>
                    <button type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        注册
                    </button>
                </div>

                <p class="text-center text-sm text-gray-500">
                    已有账号？
                    <button type="button" @click="toggleRegister"
                        class="font-medium text-red-600 hover:text-red-500">
                        立即登录
                    </button>
                </p>
            </form>
        </div>
    </div>
</template>

<style scoped>
.carousel-enter-active,
.carousel-leave-active {
  transition: opacity 0.3s ease;
}

.carousel-enter-from,
.carousel-leave-to {
  opacity: 0;
}
</style>
