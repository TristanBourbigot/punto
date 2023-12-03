<script>
import axios from 'axios';
import '@mdi/font/css/materialdesignicons.css'

  export default {
    data () {
      return {
        dialog: false,
        itemsPerPage: 10,
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
        totalPartyUserItems: 0,
        bdd : ['Sqlite', 'Mongo', 'Mysql'],
        selectedBdd: 'Sqlite',
        numberValue: 1000,
        userIdTmp: [],
        partyIdTmp: 0,
      }
    },
    methods: {
      async loadUsersItems ({ page, itemsPerPage, sortBy }) {
        this.loadingUser = true
        if(this.selectedBdd == 'Mongo'){
            this.headersUser= [
                { title: 'UserId', key: '_id', align: 'end' },
                { title: 'Name', key: 'nameUser', align: 'end' }
            ]
        }else{
            this.headersUser= [
                { title: 'UserId', key: 'userId', align: 'end' },
                { title: 'Name', key: 'nameUser', align: 'end' }
            ]
        }
        await axios.get('http://localhost:4000/getAllUser'+this.selectedBdd
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
        if(this.selectedBdd == 'Mongo'){
            this.headersParty= [
                { title: 'PartyId', key: '_id', align: 'end' },
                { title: 'WinnerId', key: 'winnerId', align: 'end' }
            ]
        }else{
            this.headersParty= [
                { title: 'PartyId', key: 'partyId', align: 'end' },
                { title: 'WinnerId', key: 'winnerId', align: 'end' }
            ]
        }


        await axios.get('http://localhost:4000/getAllParty'+this.selectedBdd
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
            
            await axios.get('http://localhost:4000/getAllPartyUsers'+this.selectedBdd
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
        loadItems () {
            this.loadUsersItems({ page: 1, itemsPerPage: 5, sortBy: [] })
            this.loadPartyItems({ page: 1, itemsPerPage: 5, sortBy: [] })
            this.loadPartyUserItems({ page: 1, itemsPerPage: 5, sortBy: [] })
        },
        deleteAll(){
            axios.delete('http://localhost:4000/delAllPartyUser'+this.selectedBdd
            ).then((response) => {
                // console.log(response);
                axios.delete('http://localhost:4000/delAllParty'+this.selectedBdd
                ).then((response) => {
                    // console.log(response);
                    axios.delete('http://localhost:4000/delAllUser'+this.selectedBdd
                    ).then((response) => {
                        // console.log(response);
                        this.loadItems()
                    }, (error) => {
                        console.log(error);
                    });
                }, (error) => {
                    console.log(error);
                });
            }, (error) => {
                console.log(error);
            });
        },
        async addMany(){
            this.loadingUser = true
            this.loadingParty = true
            this.loadingPartyUser = true
            for (let i = 0; i < this.numberValue*2; i=i+2) {
                this.userIdTmp = [];
                this.partyIdTmp = 0;
                await axios.post('http://localhost:4000/addUser'+this.selectedBdd , {
                    name: 'Joueur'+i
                }).then((response) => {
                    console.log(response)
                    if(this.selectedBdd == 'Sqlite'){
                        if (response.data.id != null)
                            this.userIdTmp.push(response.data.id);
                        else
                            this.userIdTmp.push(response.data.userId);
                    }else if(this.selectedBdd == 'Mongo'){
                        if (response.data.insertedId != null){
                            this.userIdTmp.push(response.data.insertedId);
                        }else this.userIdTmp.push(response.data.userId);
                    }else{
                        if (response.data.insertId != null)
                            this.userIdTmp.push(response.data.insertId);
                        else
                            this.userIdTmp.push(response.data[0].userId);
                    }
                }, (error) => {
                    console.log(error);
                });
                const nb = i+1;
                await axios.post('http://localhost:4000/addUser'+this.selectedBdd , {
                    name: 'Joueur'+nb
                }).then((response) => {
                    // console.log(response)
                    if(this.selectedBdd == 'Sqlite'){
                        if (response.data.id != null)
                            this.userIdTmp.push(response.data.id);
                        else
                            this.userIdTmp.push(response.data.userId);
                    }else if(this.selectedBdd == 'Mongo'){
                        if (response.data.insertedId != null){
                            this.userIdTmp.push(response.data.insertedId);
                        }else this.userIdTmp.push(response.data.userId);
                    }else{
                        if (response.data.insertId != null)
                            this.userIdTmp.push(response.data.insertId);
                        else
                            this.userIdTmp.push(response.data[0].userId);
                    }
                }, (error) => {
                    console.log(error);
                });

                
                await axios.post('http://localhost:4000/addParty'+this.selectedBdd, {winnerId:  this.userIdTmp[0]}).then(async (response) => {
                    if(this.selectedBdd == 'Sqlite'){
                        this.partyIdTmp = response.data.partyId;
                    }else if(this.selectedBdd == 'Mongo'){
                        this.partyIdTmp = response.data.insertedId;
                    }else{
                        this.partyIdTmp = response.data.insertId;
                    }
                }, (error) => {
                    console.log(error);
                });
                
                for(let j = 0; j < 2; j++){
                    await axios.post('http://localhost:4000/addPartyUsers'+this.selectedBdd, {
                    userId: this.userIdTmp[j],
                    partyId: this.partyIdTmp
                    }).then((response) => {
                        
                    }, (error) => {
                        console.log(error);
                    });
                }
            }
            this.loadItems()
        }
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
          <div>
            <v-select
                label="Select BDD"
                :items="bdd"
                v-model="selectedBdd"
                @update:modelValue="loadItems"
            ></v-select>
          </div>
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
          <div class="d-inline-flex">
            <v-btn
                color="red-accent-4"
                dark
                style="margin-left: auto;margin-right: auto;"
                v-on:click="deleteAll">
                delete all
            </v-btn>
          </div>
          <div class="d-flex justify-center mt-6 mb-6">
            <v-responsive
                class="ml-3 mr-3"
                max-width="344"
            >
                <label>Nombre de data à ajouter :</label>
                <v-text-field
                    label="Nombre de data à ajouter"
                    v-model="numberValue"
                    hide-details
                    single-line
                    type="number"
                />
            </v-responsive>
            <v-btn
                color="primary"
                dark
                v-on:click="addMany"
                class="mt-9">
                Ajouter
            </v-btn>
          </div>
          
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