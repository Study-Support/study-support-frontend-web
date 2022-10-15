<template>
    <!-- <div class="full">
        <div class="image">
            <img src="assets/groups/g1.png" alt="">
        </div>
        <div>
            <p>Information technology</p>
            <h4>Chuyên đề công nghệ</h4>
        </div>
        <span class="horizontal"></span>
        <p class="quatity"> 4 Thành viên</p>
    </div> -->
    <div class="card full" style="width: 18rem;">
        <div class="image">
            <img class="card-img-top" src="assets/groups/g1.png" alt="Card image cap">
        </div>
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
</template>
<script setup> 
</script>
<style scoped>
.full {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 5px 8px 0 rgb(0 0 0 / 10%);
}
.full:hover img {
    transform: scale(1.07);
    border-radius: 10px 10px 0 0;
}
.image {
    overflow: hidden;
    height: 200px;
}
.image img{
    width: 100%;
    border-radius: 10px 10px 0 0;
    transition: .3s ease;
    height: 100%;
}
</style>