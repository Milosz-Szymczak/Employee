<template>
  <Navbar />
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-6">
        <h3>Lista ubezpieczeń</h3>
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
            <tr v-for="insurance in insurances" :key="insurance.id">
              <td>{{ insurance.id }}</td>
              <td>{{ insurance.insuranceName }}</td>
              <td>{{ insurance.insuranceRate }}</td>
              <td>
                <a class="btn btn-primary" :href="`/edit/insurance/${insurance.id}`">Edytuj</a>
                <button class="btn btn-danger mx-2" @click="deleteInsurance(insurance.id)">Usuń</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="col-md-6">
        <h3>Dodaj nowe ubezpieczenie</h3>
        <form @submit.prevent="addInsurance">
          <div class="mb-3">
            <label for="insuranceName" class="form-label">Nazwa</label>
            <input type="text" class="form-control" id="insuranceName" v-model="newInsurance.insuranceName" required>
          </div>
          <div class="mb-3">
            <label for="premiumRate" class="form-label">Cena</label>
            <input type="number" step="0.01" class="form-control" id="premiumRate" v-model="newInsurance.insuranceRate"
              required>
          </div>
          <button type="submit" class="btn btn-primary">Dodaj ubezpieczenie</button>
        </form>
      </div>
    </div>
  </div>

  <footer class="mt-auto ">
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.05);">
      © 2024 Copyright:
      <a class="text-body" href="https://www.ambsoft.pl/">amb software IT</a>
    </div>
  </footer>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
  name: "Insurance",
  components: {
    Navbar,
  },
  data() {
    return {
      insurances: [],
      newInsurance: {
        insuranceName: '',
        insuranceRate: 0,
      },
    };
  },
  methods: {
    getInsurances() {
      fetch('http://localhost:8085/api/insurance')
        .then(res => res.json())
        .then(data => {
          this.insurances = data;
        });
    },
    deleteInsurance(id) {
      fetch(`http://localhost:8085/api/insurance/deleteInsurance/${id}`, {
        method: "DELETE",
      }).then(() => {
        this.getInsurances();
      });
    },
    addInsurance() {
      fetch('http://localhost:8085/api/insurance/addInsurance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.newInsurance)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          this.getInsurances();
          this.newInsurance.insuranceName = '';
          this.newInsurance.insuranceRate = 0;
        })
        .catch(error => {
          console.error('Error adding insurance:', error);
          alert('Failed to add insurance. Please check your input and try again.');
        });
    }
  },
  mounted() {
    this.getInsurances();
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}

</style>