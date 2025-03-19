<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    logo?: string;
    menus: Array<{
        id: string;
        title: string;
        children?: Array<{
            id: string;
            title: string;
            path?: string;
        }>;
    }>;
}>();

const activeMenuId = ref('');

const handleMenuHover = (menuId: string) => {
    activeMenuId.value = menuId;
};

const handleMenuLeave = () => {
    activeMenuId.value = '';
};
</script>

<template>
    <header class="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div class="max-w-7xl mx-auto px-4 h-16 flex items-center">
            <!-- Logo -->
            <div class="mr-8">
                <img :src="logo" alt="Logo" class="h-10 w-auto" v-if="logo" />
            </div>

            <!-- Navigation Menu -->
            <nav class="flex-1">
                <ul class="flex items-center space-x-8">
                    <li v-for="menu in menus" 
                        :key="menu.id"
                        class="group relative"
                        @mouseenter="handleMenuHover(menu.id)"
                        @mouseleave="handleMenuLeave">
                        
                        <!-- 菜单容器 -->
                        <div class="flex items-center rounded-lg transition-all duration-300"
                             :class="[
                                activeMenuId === menu.id ? 
                                'bg-red-50 shadow-sm' : 'hover:bg-gray-50/80'
                             ]">
                            <!-- 主菜单 -->
                            <div class="px-4 py-2 cursor-pointer transition-all duration-300 relative"
                                 :class="[
                                    activeMenuId === menu.id ? 
                                    'text-red-600' : 
                                    'text-gray-700 hover:text-red-500'
                                 ]">
                                <span class="font-semibold">{{ menu.title }}</span>
                                <!-- 底部装饰线 -->
                                <div class="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform scale-x-0 transition-transform duration-300"
                                     :class="{ 'scale-x-100': activeMenuId === menu.id }">
                                </div>
                            </div>
                            
                            <!-- 子菜单 -->
                            <div v-if="activeMenuId === menu.id && menu.children?.length"
                                 class="flex items-center space-x-1 transition-all duration-500 ease-out"
                                 :class="{ 
                                    'opacity-100 translate-x-0 max-w-[800px]': activeMenuId === menu.id,
                                    'opacity-0 -translate-x-4 max-w-0 overflow-hidden': activeMenuId !== menu.id
                                 }">
                                <div class="w-[2px] h-5 bg-red-200 mx-3 rounded-full transform transition-transform duration-300"
                                     :class="{ 'scale-y-100': activeMenuId === menu.id, 'scale-y-0': activeMenuId !== menu.id }">
                                </div>
                                <a v-for="(subItem, index) in menu.children"
                                   :key="subItem.id"
                                   :href="subItem.path || '#'"
                                   :style="{ 
                                     transitionDelay: `${index * 50}ms`,
                                     transform: activeMenuId === menu.id ? 'translateX(0)' : 'translateX(-10px)'
                                   }"
                                   class="px-3 py-1.5 rounded-md text-sm text-gray-500 border border-transparent
                                          hover:border-red-100 hover:bg-red-50 hover:text-red-600 
                                          transition-all duration-300 ease-out">
                                    {{ subItem.title }}
                                </a>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>