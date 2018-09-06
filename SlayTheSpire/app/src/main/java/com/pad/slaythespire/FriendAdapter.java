package com.pad.slaythespire;

import android.support.annotation.NonNull;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;

public class FriendAdapter
        extends RecyclerView.Adapter<FriendAdapter.ViewHolderFriend>
        implements View.OnClickListener{

    private ArrayList<String> dataList;
    private View.OnClickListener listener;

    public FriendAdapter() {

    }

    public void setData(ArrayList<String> dataList){
        this.dataList = dataList;
    }

    // enlaza el adaptador con la lista de items
    @NonNull
    @Override
    public ViewHolderFriend onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.list_friends,null,false);
        view.setOnClickListener(this);
        return new ViewHolderFriend(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolderFriend holder, int position) {
        holder.assignData(dataList.get(position));

    }

    @Override
    public int getItemCount() {
        return dataList.size();
    }

    @Override
    public void onClick(View v) {
        if(listener!=null){
            listener.onClick(v);
        }
    }

    public void setOnClickListener(View.OnClickListener listener){
        this.listener = listener;
    }

    public class ViewHolderFriend extends RecyclerView.ViewHolder {

        TextView textView;
        ImageView imageView;

        private CardView cardView;

        public ViewHolderFriend(View itemView) {
            super(itemView);
            textView = itemView.findViewById(R.id.friend_name);
            //imageView = itemView.findViewById(R.id.card_template_image);
        }

        public void assignData(String s) {
            textView.setText(s);
        }
    }
}
