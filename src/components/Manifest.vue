<template>
  <div>
    <ul class="nav nav-tabs m-3">
      <li class="nav-item">
        <router-link
          :to="{ name: 'ManifestGenerator'}"
          class="nav-link"
        >
          Generate
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="{ name: 'ManifestValidator'}"
          class="nav-link"
        >
          Validate
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="{ name: 'SecretEncrypter'}"
          class="nav-link"
        >
          Secrets
        </router-link>
      </li>
    </ul>

    <router-view />
  </div>
</template>
