// 添加用户部分
// 当表单发生提交行为的时候，获取表单，为表单设置事件
$('#userForm').on('submit', function() {
    // 获取用户在提交表单中输入的值，并将其格式化成字符串
    var formData = $(this).serialize();
    // 向服务器发送请求添加用户
    $.ajax({
        type: "post",
        url: "/users",
        data: formData,
        success: function(response) {
            // 请求成功的话，刷新页面
            location.reload();
        },
        error: function(response) {
            alert('用户添加失败');
        }
    });
    // 阻止表单的默认提交行为
    return false;
})

// 上传头像部分
// 当用户上传头像时，给上传头像按钮添加change事件
$('#modifyBox').on('change', '#avatar', function() {
    // new一个formData进行二进制操作
    var formData = new FormData();
    // 在formdata中添加上传了的文件
    formData.append('avatar', this.files[0]);

    // 向服务器发送请求实现头像的预览和文件地址的上传
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的数据类型
        contentType: false,
        success: function(response) {
            console.log(response);
            // 实现头像的预览效果
            $('#preview').attr('src', response[0].avatar);
            // 在隐藏域中存储文件的地址
            $('#hiddenAvatar').val(response[0].avatar);
        }
    });
})

// 用户列表展示部分
// 因为页面一打开就要显示用户列表，所以一打开页面直接向服务器端发送请求
$.ajax({
    type: "get",
    url: "/users",
    success: function(response) {
        console.log(response);
        var html = template('userTpl', {
            data: response,
        })
        $('#userBox').html(html)
    }
});

// 用户信息修改部分
// 利用事件委托给userBox下面的编辑按钮添加点击事件
$('#userBox').on('click', '.edit', function() {
    // 获取被点击的用户的id  是给编辑按钮设置自定义属性获取id值
    var id = $(this).attr('data-id');
    // 根据id值获取用户的详细信息
    $.ajax({
        type: "get",
        url: "/users/" + id,
        success: function(response) {
            console.log(response);
            var html = template('modifyTpl', response);
            $('#modifyBox').html(html);
        }
    });
})

// 用户修改表单信息提交部分
// 利用事件委托，添加用户修改表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function() {
    // 获取用户修改的表单信息，并且将其转化为字符串类型
    var formData = $(this).serialize();
    // 获取这个用户的id值
    var id = $(this).attr('data-id');
    // 向服务器端发送请求提交用户修改的表单信息，提交成功后渲染页面
    $.ajax({
        // put是修改的提交方式
        type: "put",
        url: "/users/" + id,
        data: formData,
        success: function(response) {
            // 当请求发送成功后重新刷新页面
            location.reload();
        }
    });
    // 阻止页面的默认提交
    return false;
})