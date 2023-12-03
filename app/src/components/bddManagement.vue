<script>
import axios from 'axios';
import '@mdi/font/css/materialdesignicons.css'

  export default {
    data () {
      return {
        dialog: false,
        itemsPerPage: 5,
        headersUser: [
            { title: 'UserId', key: 'userId', align: 'end' },
            { title: 'Name', key: 'nameUser', align: 'end' }
        ],
            headersParty: [
            { title: 'PartyId', key: 'partyId', align: 'end' },
            { title: 'WinnerId', key: 'winnerId', align: 'end' }
        ],
            headersPartyUser: [
            { title: 'PartyId', key: 'partyId', align: 'end' },
            { title: 'UserId', key: 'userId', align: 'end' }
        ],
        userItems: [],
        partyItems: [],
        partyUserItems: [],
        loadingUser: true,
        loadingParty: true,
        loadingPartyUser: true,
        totalUserItems: 0,
        totalPartyItems: 0,
        totalPartyUserItems: 0
      }
    },
    methods: {
      async loadUsersItems ({ page, itemsPerPage, sortBy }) {
        this.loadingUser = true
        await axios.get('http://localhost:4000/getAllUserSqlite'
        ).then((response) => {
            const start = (page - 1) * itemsPerPage
            const end = start + itemsPerPage
            const items = response.data.slice()

            if (sortBy.length) {
                const sortKey = sortBy[0].key
                const sortOrder = sortBy[0].order
                items.sort((a, b) => {
                const aValue = a[sortKey]
                const bValue = b[sortKey]
                return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
                })
            }

            this.userItems = items.slice(start, end)
            this.totalUserItems = items.length
        }, (error) => {
            console.log(error);
        });
        this.loadingUser = false
      },
      async loadPartyItems ({ page, itemsPerPage, sortBy }) {
        this.loadingParty = true
        await axios.get('http://localhost:4000/getAllPartySqlite'
        ).then((response) => {
            const start = (page - 1) * itemsPerPage
            const end = start + itemsPerPage
            const items = response.data.slice()

            if (sortBy.length) {
                const sortKey = sortBy[0].key
                const sortOrder = sortBy[0].order
                items.sort((a, b) => {
                const aValue = a[sortKey]
                const bValue = b[sortKey]
                return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
                })
            }

            this.partyItems = items.slice(start, end)
            this.totalPartyItems = items.length
        }, (error) => {
            console.log(error);
        });
        this.loadingParty = false
      },
        async loadPartyUserItems ({ page, itemsPerPage, sortBy }) {
            this.loadingPartyUser = true
            
            await axios.get('http://localhost:4000/getAllPartyUsersSqlite'
            ).then((response) => {
                const start = (page - 1) * itemsPerPage
                const end = start + itemsPerPage
                const items = response.data.slice()

                if (sortBy.length) {
                    const sortKey = sortBy[0].key
                    const sortOrder = sortBy[0].order
                    items.sort((a, b) => {
                    const aValue = a[sortKey]
                    const bValue = b[sortKey]
                    return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
                    })
                }

                this.partyUserItems = items.slice(start, end)
                this.totalPartyUserItems = items.length
            }, (error) => {
                console.log(error);
            });
            this.loadingPartyUser = false
        },
    },
  }
</script>

<template>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            dark
            v-bind="props"
            class="mt-6"
          >
            gestion des données
          </v-btn>
        </template>
        <v-card>
          <v-toolbar
            dark
            color="primary"
          >
            <v-btn
              icon
              dark
              @click="dialog = false"
            >
              X
            </v-btn>
            <v-toolbar-title>Outil de gestion des données</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-row>
            <v-col>
                <v-data-table-server
                    v-model:items-per-page="itemsPerPage"
                    :headers="headersUser"
                    :items-length="totalUserItems"
                    :items="userItems"
                    :loading="loadingUser"
                    item-value="name"
                    @update:options="loadUsersItems"
                ></v-data-table-server>
            </v-col>
            <v-col>
                <v-data-table-server
                    v-model:items-per-page="itemsPerPage"
                    :headers="headersParty"
                    :items-length="totalPartyItems"
                    :items="partyItems"
                    :loading="loadingParty"
                    item-value="name"
                    @update:options="loadPartyItems"
                ></v-data-table-server>
            </v-col>
            <v-col>
                <v-data-table-server
                    v-model:items-per-page="itemsPerPage"
                    :headers="headersPartyUser"
                    :items-length="totalPartyUserItems"
                    :items="partyUserItems"
                    :loading="loadingPartyUser"
                    item-value="name"
                    @update:options="loadPartyUserItems"
                ></v-data-table-server>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-row>
  </template>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
</style>