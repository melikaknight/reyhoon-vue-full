<template>
  <div class="comment-card-container">
    <div class="comment-card-meta">
      <h3> {{ author }} </h3>
      <div class="star-rating">
        <star-rating 
          :rating="averageRating" 
          :read-only="true"
          :star-size="14" 
          :increment="0.01"
          :show-rating="false"
          :border-width="4" 
          border-color="#d8d8d8" 
          :rounded-corners="true" 
          :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
          :rtl="true"
        >
        </star-rating>
      </div>
      <h3>{{averageRating}}</h3>
    </div>
    <p class="comment-card-comment" v-show="comment">
      <span>
        <i class="fa fa-quote-left"></i>
        {{ comment }}
      </span>
    </p>
    <div class="comment-card-footer">
      <p> {{ $moment(createdAt).fromNow() }} </p>
      <p> گزارش </p>
    </div>
  </div>
</template>
<script>
  // import moment from 'moment';
  export default {
    name: "CommentCard",
    props: {
      averageRating: {
        type: Number,
        required: true,
      },
      author: {
        type: String,
        required: true,
        default: 'ناشناس',
      },
      comment: {
        type: String,
      },
      createdAt: {
        type: String,
      }
    }
  }
</script>

