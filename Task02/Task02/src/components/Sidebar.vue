<template>
    <div class="sidebar">
      <ul>
        <li><a href="#">All</a></li>
        <li><a href="#" class="active">Hot</a></li>
        <li><a href="#">Show HN</a></li>
        <li><a href="#">Ask HN</a></li>
        <li><a href="#">Polls</a></li>
        <li><a href="#">Jobs</a></li>
        <li><a href="#">Shipow</a></li>
        <li><a href="#">Starred</a></li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Sidebar'
  };
  </script>
  
  <style>
  .sidebar {
    width: 200px;
    background-color: #e9e9e9;
    padding: 20px 20px;
    border-right: 1px solid #ddd;
  }
  
  .sidebar ul {
    list-style: none;
    padding:0;
  }
  
  .sidebar li {
    margin-bottom: 20px;
  }
  
  .sidebar a {
    text-decoration: none;
    color: #333;
  }
  </style>
  