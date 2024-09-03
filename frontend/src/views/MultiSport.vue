<template>
    <Navbar />
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-6">
          <h3>Lista MultiSport</h3>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nazwa</th>
                <th>Cena</th>
                <th>Funkcje</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="multisport in multisports" :key="multisport.id">
                <td>{{ multisport.id }}</td>
                <td>{{ multisport.packageName }}</td>
                <td>{{ multisport.packageValue }}</td>
                <td>
                  <a class="btn btn-primary" :href="`/edit/multisport/${multisport.id}`">Edytuj</a>
                  <button class="btn btn-danger mx-2" @click="deleteMultiSport(multisport.id)">Usuń</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div class="col-md-6">
          <h3>Dodaj nowy pakiet</h3>
          <form @submit.prevent="addMultiSport">
            <div class="mb-3">
              <label for="insuranceName" class="form-label">Nazwa</label>
              <input type="text" class="form-control" id="insuranceName" v-model="newMultiSport.packageName" required>
            </div>
            <div class="mb-3">
              <label for="premiumRate" class="form-label">Cena</label>
              <input type="number" step="0.01" class="form-control" id="premiumRate" v-model="newMultiSport.packageValue"
                required>
            </div>
            <button type="submit" class="btn btn-primary">Dodaj pakiet</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from "../components/Navbar.vue";
  
  export default {
    name: "MultiSport",
    components: {
      Navbar,
    },
    data() {
      return {
        multisports: [],
        newMultiSport: {
          packageName: '',
          packageValue: 0,
        },
      };
    },
    methods: {
      geMultiSports() {
        fetch('http://localhost:8085/api/multisport')
          .then(res => res.json())
          .then(data => {
            this.multisports = data;
          })
          .catch(error => {
            console.error('Error fetching insurance records:', error);
            alert('Failed to fetch insurance records. Please try again later.');
          });
      },
      deleteMultiSport(id) {
        fetch(`http://localhost:8085/api/multisport/deleteMultiSport/${id}`, {
          method: "DELETE",
        }).then(() => {
          this.geMultiSports();
        });
      },
      addMultiSport() {
        fetch('http://localhost:8085/api/multisport/addMultiSport', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.newMultiSport)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            this.geMultiSports();
            this.newMultiSport.packageName = '';
            this.newMultiSport.packageValue = 0;
          })
          .catch(error => {
            console.error('Error adding insurance:', error);
            alert('Failed to add insurance. Please check your input and try again.');
          });
      }
    },
    mounted() {
      this.geMultiSports();
    },
  };
  </script>
  
  <style scoped>
  .container {
    margin-top: 20px;
  }
  </style>